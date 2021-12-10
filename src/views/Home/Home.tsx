import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout, Flex, Button, Card, CardBody, CardHeader, FarmIcon, TicketFillIcon, VoteIcon } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
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

  return (
    <Page>
      <Hero>
        <img src="/images/logo.png" width="200px" height="200px" alt="logo bernard finance"/>
        <Heading as="h1" size="xxl" mb="24px" color="text">

          Bernard Finance
        </Heading>
        <Text mb="" color="textSubtle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam condimentum vulputate tellus vitae tincidunt. Proin vel condimentum sapien.<br/>
        </Text>
        <Text mb="" color="textSubtle">
          Nullam condimentum vulputate tellus vitae tincidunt. Proin vel condimentum sapien.<br/>
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
                  <Heading size="lg" color="secondary">480%</Heading>
                </div>

                <div style={{marginTop: '30px'}}>
                  <Text color="textSubtle">Try ou superfarms now</Text>
                </div>

                <div style={{marginTop: '30px'}}>
                  <Button as="a" href="/farms" variant="secondary" style={{border: '2px solid #664EA0', color: '#664EA0'}}>
                    Try it
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
                  <Heading color="text" size="lg">Amount of prize to win</Heading>
                  <Heading size="lg" color="#008611">$120,000%</Heading>
                </div>

                <div style={{marginTop: '30px'}}>
                  <Text color="textSubtle">Get your ticket now</Text>
                </div>

                <div style={{marginTop: '30px'}}>
                  <Button as="a" href="/farms" variant="secondary" style={{border: '2px solid #008611', color: '#008611'}}>
                    Try it
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
                  <Heading color="text" size="lg">Your $BONES available</Heading>
                  <Heading size="lg" color="#ffc00b">12456</Heading>
                </div>

                <div style={{marginTop: '30px'}}>
                  <Text color="textSubtle">Start betting now</Text>
                </div>

                <div style={{marginTop: '30px'}}>
                  <Button as="a" href="/farms" variant="secondary" style={{border: '2px solid #ffc00b', color: '#ffc00b'}}>
                    Try it
                  </Button>
                </div>
              </CardBody>
            </CardHero>
          </FlexCard>
        </Flex>

      </Hero>
      <Section>
        <FlexSection flexDirection="row" justifyContent="space-between" alignItems="center">
          <FlexSecondSection flexDirection="column" style={{textAlign: 'left'}}>
            <Heading color="text" size="xl"><span style={{color: '#5DCE80'}}>Discover</span> Our NFT</Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a auctor lorem. Nunc porttitor vulputate luctus. Pellentesque fermentum placerat suscipit. Integer egestas nec eros ut elementum. Integer at dignissim est.
            </Text>
            <Button as="a" href="/farms" variant="primary" >
              Buy
            </Button>
          </FlexSecondSection>
          <Flex flexDirection="column">
            <img src="/images/bernard.png" width="300px" height="300px" alt="logo bernard finance"/>
          </Flex>
        </FlexSection>
      </Section>

      <Section className="middle">
        <FlexSection flexDirection="row" justifyContent="space-between" alignItems="center">
          <Flex flexDirection="column">
            <img src="/images/bernard.png" width="300px" height="300px" alt="logo bernard finance"/>
          </Flex>
          <FlexSecondSection flexDirection="column" style={{textAlign: 'left'}}>
            <Heading color="text" size="xl"><span style={{color: '#5DCE80'}}>Strong</span> Ecosystem</Heading>
            <Text>
              Bernard Finance provide a powerful synergy for your capital.
            </Text>
            <Button as="a" href="/farms" variant="primary" >
              Learn
            </Button>
          </FlexSecondSection>

        </FlexSection>
      </Section>

      <Section>
        <FlexSection flexDirection="row" justifyContent="space-between" alignItems="center">
          <FlexSecondSection flexDirection="column" style={{textAlign: 'left'}}>
            <Heading color="text" size="xl"><span style={{color: '#5DCE80'}}>SOON</span> Bernardo Fight Club.</Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu accumsan elit, at congue ipsum. Praesent a nibh ligula.
            </Text>
            <Button as="a" href="/farms" variant="primary" >
              Learn
            </Button>
          </FlexSecondSection>
          <Flex flexDirection="column">
            <img src="/images/bernard.png" width="300px" height="300px" alt="logo bernard finance"/>
          </Flex>
        </FlexSection>
      </Section>
    </Page>
  )
}

export default Home
