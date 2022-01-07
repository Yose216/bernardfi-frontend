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
import { useFarms, usePriceBnbBusd, usePriceCakeBusd } from 'state/hooks'
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
  const bnbPrice = usePriceBnbBusd()
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
console.log(farmsLP)
  const activeFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier === '0X')

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
          totalValue = totalValue.times(bnbPrice);
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
          bnbPrice={bnbPrice}
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
          <Heading as="h1" size="lg" color="primary" mb="25px" style={{ textAlign: 'center' }}>
            {
              tokenMode ?
                'Stake tokens to earn $BONES'
                :
                'Stake LP tokens to earn $BONES'
            }
          </Heading>
          <Heading as="h2" color="text" style={{ textAlign: 'center' }}>
            Deposit Fee will be used to buyback $BONES
          </Heading>
        </Inner>
      </Outer>


      <FarmTabButtons stakedOnly={stakedOnly} setStakedOnly={setStakedOnly}/>
      <div >
        <Divider />
        <FlexFarm >
          <Route exact path={`${path}`}>
            {stakedOnly ? farmsList(stakedOnlyFarms, false) : farmsList(activeFarms, false)}
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
              <Heading color="text" size="xl"><span style={{color: '#5DCE80'}}>Claim your NFT airdrop !</span></Heading>
              <Text mt="10px">
                Hold/stake BONES-BUSD LP tokens and claim your NFT airdrop !<br/>
                This Bronze BONES Special Edition helmet is the first piece of equipment you can get for our incoming game The Bernardo Fight Club. You can claim yours if you hold X LP tokens (TBD) until X of X. This NFT opens gates to Bronze bernardswap staking pools.
              </Text>
              <Text mt="10px">
                <Countdown date={Date.now() + 1000000000} renderer={renderer}/>
              </Text>
            </FlexSecondSection>
            <Flex flexDirection="column">
              <video autoPlay muted playsInline loop width="250" >
                <track default kind="captions" srcLang="en" src="/media/examples/friday.vtt" />
                <source src="/images/viking-helmet-BFC.mp4" type="video/mp4" />

              </video>
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

const FlexFarm = styled.div`
display: flex;
justify-content: center;
flex-wrap: wrap;
& > * {
  min-width: 280px;
  max-width: 28%;
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
export default Farms
