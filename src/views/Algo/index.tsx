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
            Make profits to buyback.
          </Heading>

        </Inner>
      </Outer>
      <Page style={{justifyContent: 'center', alignItems: 'center', flex: 1, display: 'flex'}}>
        <Flex flexDirection="column" style={{width: '80%', margin: '50px 0'}} >
          <Heading size="lg" color="secondary" mb="3">
            The mission of bernard.finance’s algorithm is to bring upward buy pressure via MASSIVE and AUTOMATISED buybacks on our ecosystem.
          </Heading>
          <Text mb="3" mt="2" color="text" style={{fontSize:'18px'}}>
            With a starting capital of $111,000 raised during $BARREL presale, it trades spot crypto pairs on FTX exchange since July 2021.
          </Text>
          <Text mb="3" color="text" style={{fontSize:'18px'}}>
            And we couldn’t be happier with the results, it reached our expectations and even beyond. <span style={{fontWeight:'bold'}}>Consistency, versatility, corrections-proof, great performances.</span>
          </Text>
          <Text mb="3" color="text" style={{fontSize:'18px'}}>
            Average perf is close to <span style={{fontWeight:'bold'}}>8.5–10 % per month</span> which was our high end goal and is fantastic results for a spot algo
          </Text>
          <Text mb="3" color="text" style={{fontSize:'18px'}}>
            We expect profits to greatly increase due to global compounding, $BONES sell tax and bernardswap mechanics.
          </Text>
          <Text mb="3" color="text" style={{fontSize:'18px'}}>
            Algo profits are reinjected twice a month in bernard.finance ecosystem, 50% to buyback $BARREL, 30% to buyback $BERN, and auto compound.
          </Text>
          <Text mb="3" color="text" style={{fontSize:'18px'}}>
            If you want to learn more about our overall perfs and projections, please take a look here.
          </Text>
          <Wrapper mt="12px" style={{justifyContent: 'center'}}>
            <Button as="a" href="https://bernard-finance.gitbook.io/bernardswap/infos/trading-algorithm" mt="15px" variant="primary" style={{textAlign: 'center'}}>
              LEARN MORE
            </Button>
          </Wrapper>

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

const Wrapper = styled(Flex)`
  align-items: center;
`

export default Algo
