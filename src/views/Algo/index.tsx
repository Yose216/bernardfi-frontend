import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Image, Heading, Text, Button, Flex} from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import Container from 'components/layout/Container'

const data = [
  {
    name: '1/8',
    profits: 8484
  },
  {
    name: '14/8',
    profits: 12587,
  },
  {
    name: '28/8',
    profits: 18592,
  },
  {
    name: '11/9',
    profits: 26372,
  },
  {
    name: '25/9',
    profits: 31565,
  },
  {
    name: '14/10',
    profits: 33620,
  },
  {
    name: '3/11',
    profits: 41379,
  },
  {
    name: '15/11',
    profits: 44438,
  },
  {
    name: '28/11',
    profits: 49685,
  },
  {
    name: '24/12',
    profits: 55805,
  },
];

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

          <div style={{height: "500px", marginTop: "50px"}}>
            <Heading size="md" color="primary" style={{textAlign:"center", marginBottom: "15px"}}>
              Trading account profits/buybacks in USD
            </Heading>

            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
              <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#548d65" stopOpacity={1}/>
                  <stop offset="50%" stopColor="#548d65" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#548d65" stopOpacity={1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name"  />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="profits" stroke="url(#color)" fill="url(#color)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

        </Flex>
      </Page>
    </>
  )
}


const Outer = styled.div`
background-image: url('/images/bernardswap.png');
background-position: center;
background-size: contain;
`

const Inner = styled(Container)`
background: linear-gradient(139.73deg, #27262cb3 0%, #548d65 100%);

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
