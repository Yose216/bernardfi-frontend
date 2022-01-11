import React from 'react'
import { Image, Heading, Text, Button, Flex} from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import Container from 'components/layout/Container'

const BFC: React.FC = () => {

  return (
    <>
      <Outer>
        <Inner>
          <img  src="/images/bfc-logo.png" alt="phishing-warning" width="300px"/>
          <Heading size="lg" color="text">
            Coming SOON
          </Heading>

        </Inner>
      </Outer>
      <Page style={{justifyContent: 'center', alignItems: 'center', flex: 1, display: 'flex', minHeight: '0px'}}>
        <Flex flexDirection="column" >
          <Title style={{paddingBottom: '30px'}}>
            <Gradient>Bernardo Fight Club</Gradient>
          </Title>
          <img width="700px" src="/images/BFC-infography.png" alt="info" />

        </Flex>
      </Page>
    </>
  )
}


const Outer = styled.div`
  background: linear-gradient(130deg, #2163e2 0%, #22201f 50%, #ee002f 100%);
`

const Inner = styled(Container)`
  padding-top: 32px;
  padding-bottom: 32px;
  text-align: center;
`

const Title = styled.h1`
  font-size: 65px;
  @media screen and (max-width: 768px) {
    font-size: 30px!important;
  }
`

const Gradient = styled('span')(({ theme }) => ({
  background: 'linear-gradient(90deg, #2163e2 30%, #ee002f 100%)',
  '-webkitBackgroundClip': 'text',
  '-webkitTextFillColor': 'transparent',
}));

export default BFC
