import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Heading, Text, BaseLayout, Flex, Button, Card, CardBody, CardHeader, FarmIcon, TicketFillIcon, VoteIcon } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { useFarms, usePriceBnbBusd, usePriceCakeBusd } from 'state/hooks'
import { useTotalRewards } from 'hooks/useTickets'
import Page from 'components/layout/Page'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import { QuoteToken } from 'config/constants/types'
import useTokenBalance from 'hooks/useTokenBalance'
import { getBalanceNumber } from 'utils/formatBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import FarmStakingCard from './components/FarmStakingCard'
import LotteryCard from './components/LotteryCard'
import CakeStats from './components/CakeStats'
import TotalValueLockedCard from './components/TotalValueLockedCard'
import TwitterCard from './components/TwitterCard'


const Hero = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 20px;
  text-align: center;
  background: linear-gradient(180deg, #27262cb3 22%, #548d65 100%);

`

const Section = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 20px;
  text-align: center;
  background: #27262cb3;
  padding: 50px 0;
  min-height: 400px;
  &.middle {
    background: linear-gradient(130deg, #191919 30%, #548d65 100%);
  }

`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 48px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const FlexCard = styled(Flex)`
  @media screen and (max-width: 768px) {
    flex-direction: column
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

const CardHero = styled(Card)`
  min-height: 300px;
  background: #27262c;
  border-radius: 15px;
  width: 30%;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 50px;
  }

`

const Home: React.FC = () => {
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const cakePrice = usePriceCakeBusd()
  const bnbPrice = usePriceBnbBusd()
  const bonesBalance = getBalanceNumber(useTokenBalance(getCakeAddress()))
  let lotteryPrizeAmount = +(getBalanceNumber(useTotalRewards()).toFixed(0))

  if (cakePrice.toNumber() > 0) {
     lotteryPrizeAmount *= cakePrice.toNumber()
  } else {
    lotteryPrizeAmount *= 0
  }
  const lotteryPrizeWithCommaSeparators = lotteryPrizeAmount.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })

  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const activeFarms = farmsLP.filter((farm) => !farm.isTokenOnly && farm.multiplier !== '0X')

  let superApy = 0;
  const bestApy = activeFarms.map((farm) => {
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

    const farmAPY = apy && apy.times(new BigNumber(100)).toNumber()

    if (farmAPY && farmAPY > superApy) {
      superApy = farmAPY;
    }

    return 0;
  })

  const superApyFormated = superApy.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })

  return (
    <Page>
      <Hero>
        <img src="/images/logo.png" width="200px" height="200px" alt="logo bernard finance"/>
        <Heading as="h1" size="xxl" mb="24px" color="text">

          BernardSwap
        </Heading>
        <Text mb="" color="textSubtle">
          Trade it, stake it, play it, earn it <br/>
        </Text>
        <Text mb="" color="textSubtle">
        Exploit web3, NFTs, DeFi and Play to earn games to your advantage to grow your capital effortless.<br/>
        </Text>


        <Flex flexDirection="column" style={{width: '80%', margin: '50px 0'}}>
          <FlexCard flexDirection="row" justifyContent="space-between" alignItems="space-between">
            <CardHero>
              <CardBody style={{padding: '0', borderRadius: '1%'}}>
                <CardHeader style={{background: 'transparent', borderBottom: '1px solid rgb(255 255 255 / 7%)'}}>
                  <Flex flexDirection="row" justifyContent="space-between" alignItems="space-between">
                    <Heading size="lg">Staking</Heading>
                    <FarmIcon color="secondary" width="35px"/>
                  </Flex>
                </CardHeader>

                <div style={{marginTop: '15px'}}>
                  <Heading color="text" size="lg">Earn up to</Heading>
                  <Heading size="lg" color="secondary">{superApyFormated}%</Heading>
                </div>

                <div style={{marginTop: '30px'}}>
                  <Text color="textSubtle">Try ou superpools now</Text>
                </div>

                <div style={{marginTop: '30px'}}>
                  <Button as="a" href="/farms" variant="secondary" style={{border: '2px solid #664EA0', color: '#664EA0'}}>
                    Stake!
                  </Button>
                </div>
              </CardBody>
            </CardHero>

            <CardHero>
              <CardBody style={{padding: '0', borderRadius: '1%'}}>
                <CardHeader style={{background: 'transparent', borderBottom: '1px solid rgb(255 255 255 / 7%)'}}>
                  <Flex flexDirection="row" justifyContent="space-between" alignItems="space-between">
                    <Heading size="lg">Lottery</Heading>
                    <TicketFillIcon color="#008611" width="35px"/>
                  </Flex>
                </CardHeader>

                <div style={{marginTop: '15px'}}>
                  <Heading size="lg" color="#008611">${lotteryPrizeWithCommaSeparators}</Heading>
                </div>

                <div style={{marginTop: '30px'}}>
                  <Text color="textSubtle">Get your tickets now</Text>
                </div>

                <div style={{marginTop: '30px'}}>
                  <Button as="a" href="/lottery" variant="secondary" style={{border: '2px solid #008611', color: '#008611'}}>
                    Play!
                  </Button>
                </div>
              </CardBody>
            </CardHero>

            <CardHero>
              <CardBody style={{padding: '0', borderRadius: '1%'}}>
                <CardHeader style={{background: 'transparent', borderBottom: '1px solid rgb(255 255 255 / 7%)'}}>
                  <Flex flexDirection="row" justifyContent="space-between" alignItems="space-between">
                    <Heading size="lg">Bets</Heading>
                    <VoteIcon color="#ffc00b" width="35px"/>
                  </Flex>
                </CardHeader>

                <div style={{marginTop: '15px'}}>
                  <Heading color="text" size="lg">Latest bet available</Heading>
                  <Heading size="lg" color="#ffc00b">X vs Y / 20.01 09:00:00</Heading>
                </div>

                <div style={{marginTop: '30px'}}>
                  <Text color="textSubtle">Start betting now</Text>
                </div>

                <div style={{marginTop: '30px'}}>
                  <Button as="a" href="/bets" variant="secondary" style={{border: '2px solid #ffc00b', color: '#ffc00b'}}>
                    Bet!
                  </Button>
                </div>
              </CardBody>
            </CardHero>
          </FlexCard>
        </Flex>

      </Hero>
      <Section>
        <FlexSection flexDirection="row" justifyContent="space-between" alignItems="center">
          <Flex flexDirection="column">
            <img src="/images/nft.png" width="400px" alt="logo bernard finance"/>
          </Flex>
          <FlexSecondSection flexDirection="column" style={{textAlign: 'left'}}>
            <Heading color="text" size="xl"><span style={{color: '#5DCE80'}}>Discover</span> Our NFTs</Heading>
            <Text mt="10px">
            Explore our marketplace and pick your favorites. Bernard.finance NFTs are keys to superpools staking. Get your hand on the rarest ones to enjoy the highest sustained rewards in DeFi !
            </Text>
            <Button as="a" href="/farms" variant="primary" mt="10px" >
              Buy
            </Button>
          </FlexSecondSection>
        </FlexSection>
      </Section>

      <Section className="middle">
        <FlexSection flexDirection="row" justifyContent="space-between" alignItems="center">
          <FlexSecondSection flexDirection="column" style={{textAlign: 'left'}}>
            <Heading color="text" size="xl"><span style={{color: '#5DCE80'}}>Strong</span> Ecosystem</Heading>
            <Text mt="10px">
              Discover bernard.finance ecosystem, designed to grow your capital through a powerful synergy.
            </Text>
            <Button as="a" href="/farms" variant="primary" mt="10px">
              Learn
            </Button>
          </FlexSecondSection>
          <Flex flexDirection="column">
            <img src="/images/ecosystem.png" width="300px"  alt="logo bernard finance"/>
          </Flex>
        </FlexSection>
      </Section>

      <Section>
        <FlexSection flexDirection="row" justifyContent="space-between" alignItems="center">
        <Flex flexDirection="column">
          <img src="/images/bernard.png" width="300px" height="300px" alt="logo bernard finance"/>
        </Flex>
          <FlexSecondSection flexDirection="column" style={{textAlign: 'left'}}>

            <Heading color="text" size="xl"><span style={{color: '#5DCE80'}}>SOON</span> The Bernardo Fight Club.</Heading>
            <Text mt="10px">
              Rule N°1 : You do talk about the BFC<br/>
              Rule N°2 : You DO TALK about the BFC<br/>
              Rule N°3 : If a fighter says &quot;stop&quot; or goes limp, crush him<br/>
              Rule N°4 : ...
            </Text>
            <Button as="a" href="/farms" variant="primary" mt="10px">
              Learn
            </Button>
          </FlexSecondSection>
        </FlexSection>
      </Section>
    </Page>
  )
}

export default Home
