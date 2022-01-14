import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import Countdown from 'react-countdown';
import { Image, Heading, Text, Flex } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import Container from 'components/layout/Container'
import { useFarms, usePriceBnbBusd, usePriceCakeBusd, useNfts, usePrices} from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'

export interface FarmsProps{
  tokenMode?: boolean
}

const Farms: React.FC<FarmsProps> = (farmsProps) => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const cakePrice = usePriceCakeBusd()
  const prices = usePrices()[0]
  const bnbPrice = prices.bnbPrice
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const {tokenMode} = farmsProps;

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stakedOnly, setStakedOnly] = useState(false)
  const activeFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier === '0X')
  const classicFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier !== '0X' && farm.level === 1)
  const bronzeFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier !== '0X' && farm.level === 2)
  const superFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier !== '0X' && farm.level === 3)

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      // const cakePriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === CAKE_POOL_PID)?.tokenPriceVsQuote || 0)
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        // if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
        //   return farm
        // }

        const cakeRewardPerBlock = new BigNumber(farm.BONESPerBlock || 1).times(new BigNumber(farm.poolWeight)) .div(new BigNumber(10).pow(18))
        const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apy = cakePrice.times(cakeRewardPerYear);

        let totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0);


        if (farm.quoteTokenSymbol === QuoteToken.BNB) {
          totalValue = totalValue.times(new BigNumber(bnbPrice));
        }

        if(totalValue.comparedTo(0) > 0){
          apy = apy.div(totalValue);
        }

        return { ...farm, apy }
      })
      return farmsToDisplayWithAPY.map((farm) => (
        <FarmCard
          key={farm.pid}
          farm={farm}
          removed={removed}
          bnbPrice={new BigNumber(bnbPrice)}
          cakePrice={cakePrice}
          ethereum={ethereum}
          account={account}
        />
      ))
    },
    [bnbPrice, account, cakePrice, ethereum],
  )

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (days !== 0) {
      return (

        <Heading as="h5" size="lg" color="secondary">
          {days} days and {hours} hours remainings
        </Heading>
      )
    }
    return (

      <Heading as="h5" size="lg" color="secondary">
        {hours}:{minutes}:{seconds} until the airdrop
      </Heading>
    )
};

  return (
    <Page >
      <Outer>
        <Inner>
          <Heading as="h1" size="xl" color="primary" mb="25px" style={{ textAlign: 'center' }}>
            {
              tokenMode ?
                'Stake tokens to earn $BONES'
                :
                'Stake LP tokens to earn $BONES'
            }
          </Heading>
          <Heading as="h2" size="lg" color="text" style={{ textAlign: 'center' }}>
          {
            tokenMode ?
              'NFTs with a use case, finally'
              :
              'Holding is rewarding'
          }
          </Heading>
        </Inner>
      </Outer>
      {
        tokenMode ?
        <div style={{marginBottom: '30px'}}>
          <Heading as="h3" color="text" style={{ textAlign: 'center' }}>
            Buy and hold bernard.finance’s seasonal NFTs to enjoy highest sustained rewards in DeFi.
          </Heading>
          <Text color="red" style={{ textAlign: 'center' }}>
            Be careful : If you sell or transfer your NFT while staking, you will lose your staking rewards.
          </Text>
          <Text color="#ffc00b" style={{ textAlign: 'center' }}>
            Warning : BERN token has a 10% tax on all transactions so choose your staking pool wisely. We will remove this tax on BERN v2 to adapt it to staking. Thanks for your understanding.
          </Text>
        </div>
        :
        null
      }

      <FarmTabButtons stakedOnly={stakedOnly} setStakedOnly={setStakedOnly}/>
      <div >
        <Divider />
        <FlexFarm >
          <Route exact path={`${path}`}>
            <Flex flexDirection="column" >
              {tokenMode ?
                <>
                  <Heading as="h3" size="xl" color="primary" style={{ textAlign: 'center', paddingBottom: '10px' }}>
                    Classic pools
                  </Heading>
                  <FlexToken>
                    {stakedOnly ? farmsList(stakedOnlyFarms, false) : farmsList(classicFarms, false)}
                  </FlexToken>
                  <Divider />
                  <Heading as="h3" size="xl" color="#cd7f32" style={{ textAlign: 'center', paddingBottom: '10px' }}>
                    Bronze pools
                  </Heading>
                  <FlexToken>
                    {stakedOnly ? farmsList(stakedOnlyFarms, false) : farmsList(bronzeFarms, false)}
                  </FlexToken>
                  <Divider />
                  <Heading as="h3" size="xl" color="#E6C300" style={{ textAlign: 'center', paddingBottom: '10px' }}>
                    Super pools
                  </Heading>
                  <FlexToken>
                    {stakedOnly ? farmsList(stakedOnlyFarms, false) : farmsList(superFarms, false)}
                  </FlexToken>
                </> :
                <FlexToken>
                  {stakedOnly ? farmsList(stakedOnlyFarms, false) : farmsList(activeFarms, false)}
                </FlexToken>
              }

            </Flex>

          </Route>
          <Route exact path={`${path}/history`}>
            {farmsList(inactiveFarms, true)}
          </Route>
        </FlexFarm>
      </div>
      <div>
        <Divider />
        <Section>
          <FlexSection flexDirection="row" justifyContent="space-between" alignItems="center">
            <FlexSecondSection flexDirection="column" style={{textAlign: 'left'}}>
            {tokenMode ?
              <Heading color="text" size="xl"><span style={{color: '#5DCE80'}}>Holding an NFT grants you free access to The Bernardo Fight Club</span></Heading>
              :
              <Heading color="text" size="xl"><span style={{color: '#5DCE80'}}>Stake BONES-BUSD LP tokens to win a free acces to The Bernardo Fight Club</span></Heading>

            }
            {
              tokenMode ?
              <Text mt="10px">
                bernard.finance seasonal NFT holders will be airdropped one guaranteed α gen. BFC portal per NFT held.
                Doghouses portals allow you to freely mint 1 random bernardo character for our next game « The Bernardo Fight Club ».
                Simply buy and hold before 1st of March to be airdropped.
              </Text>
              :
              <Text mt="10px">
                Stake BONES-BUSD LP to become eligible to  β generation BFC portals airdrop.<br/>

                100 doghouses portals will be distributed to LP holders. They allow you to freely mint 1 random bernardo character for our next game « The Bernardo Fight Club ».
                Snapshot will happen between 12th January 2022 and 15th of March.
                We will airdrop portals to holders taking in consideration two variables : 1. Amount of time of staking, 2. quantity of LP.<br/>

                You help us being stronger, we reward you, simple as that.
              </Text>
            }

              <Text mt="10px">
                <Countdown date={tokenMode ? 1646089200000 : 1647298800000} renderer={renderer}/>
              </Text>
            </FlexSecondSection>
            <Flex flexDirection="column">
            { tokenMode ?
              <img width="350px" src="/images/nft-pool.png" alt="nft to win" />
              :
              <img width="350px" src="/images/nft-farm.png" alt="nft to win" />
            }

            </Flex>
          </FlexSection>
        </Section>
      </div>
    </Page>
  )
}

const Outer = styled.div`
  margin-bottom: 50px;
  background-image: url('/images/bernardswap.png');
  background-position: center;
  background-size: contain;

`

const Inner = styled(Container)`
  padding-top: 80px;
  padding-bottom: 32px;
  height: 250px;
  background: linear-gradient(139.73deg, #27262cb3 0%, #548d65 100%);

  & h1 {
    @media screen and (max-width: 768px) {
      font-size: 30px!important;

    }
  }
`

const FarmRow = styled(Flex)`
  flex-direction: column;

`

const FlexFarm = styled.div`
display: flex;
justify-content: center;
flex-wrap: wrap;
& > * {
  min-width: 280px;
  max-width: 25%;
  width: 100%;
  margin: 0 30px;
  margin-bottom: 32px;
}

`
const Section = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding-bottom: 30px;
  &.middle {
    background: linear-gradient(130deg, #191919 30%, #548d65 100%);
  }

`
const FlexSection = styled(Flex)`
  width: 60%;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }

`
const FlexSecondSection = styled(Flex)`
  width: 60%;
  @media screen and (max-width: 768px) {
    width: 90%;
  }

`

const FlexToken = styled(Flex)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding-top: 25px;
  padding-bottom: 25px;
  & > * {
    min-width: 380px;
    max-width: 30%;
    width: 100%;
    margin: 0 30px;
    margin-bottom: 32px;
  }
  @media screen and (max-width:968px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > * {
      min-width: 280px;
    }
  }

`
export default Farms
