import React from 'react'
import { Image, Heading, Text, Button, Flex} from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import Container from 'components/layout/Container'

const Algo: React.FC = () => {

  return (
    <>
      <Outer>
        <Inner>
          <Heading as="h1" size="xxl" color="primary" mb="24px">
            Algo performance
          </Heading>
          <Heading size="md" color="text">
            Algorythmic trading account performances.
          </Heading>

        </Inner>
      </Outer>
      <Page style={{justifyContent: 'center', alignItems: 'center', flex: 1, display: 'flex'}}>
        <Flex flexDirection="column" style={{width: '80%', margin: '50px 0'}} >
          <Text mb="3" mt="2" color="text">
            The function of $BARREL algorithm is to bring upward buy pressure via MASSIVE and AUTOMATISED buybacks on the Bernard.finance ecosystem. $BARREL gets to profit from spot trading on the crypto exchange FTX.
          </Text>
          <Text mb="3" color="text">
            <span style={{fontWeight:'bold', fontSize: '20px'}}>Continuous growth</span><br/>
            Thanks to the several burn options, $BARREL is deflationary and its value will increase on each transaction.
          </Text>
          <Text mb="3" color="text">
            <span style={{fontWeight:'bold', fontSize: '20px'}}>HODL to win</span><br/>
            6% of each sell will buy back $BARREL. 50% of algo gains will buy back $BARREL. All the buy-backs will be burned.
          </Text>
          <Text mb="3" color="text">
            <span style={{fontWeight:'bold', fontSize: '20px'}}>Certik audited</span><br/>
            BARREL has been successfully audited by Certik
          </Text>
          <Text mb="3" color="text">
            <span style={{fontWeight:'bold', fontSize: '20px'}}>Exclusivity</span><br/>
            $BARREL holders will be the first to know about the next bernard.finance projects and will be incentivised to participate in future events.
          </Text>
          <Text mb="3" color="text">
            Buybacks are done every 2 weeks
          </Text>
          <Text mb="3" color="text">
            $BARREL trading bot Update of (daydate) :
          </Text>
          <img src="/images/algo_perf.jpg" alt="algo perf" />
        </Flex>
      </Page>
    </>
  )
}


const Outer = styled.div`
  background: linear-gradient(139.73deg, #27262cb3 0%, #548d65 100%);
`

const Inner = styled(Container)`
  padding-top: 32px;
  padding-bottom: 32px;
  padding-left: 10%;
  & h1 {
    @media screen and (max-width: 768px) {
      font-size: 30px!important;

    }
  }
`

export default Algo
