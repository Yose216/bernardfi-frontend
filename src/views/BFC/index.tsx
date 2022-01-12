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
          <Title style={{paddingBottom: '30px', textAlign: 'center'}}>
            <Gradient>Bernardo Fight Club</Gradient>
          </Title>
          <Heading size="lg" color="text">
            Coming SOON
          </Heading>
        </Inner>
      </Outer>
      <Page style={{justifyContent: 'center', alignItems: 'center', flex: 1, display: 'flex', minHeight: '0px'}}>
        <Flex flexDirection="column" style={{width: '80%', margin: '50px 0'}}>
          <Heading size="lg" color="secondary" mb="3">
            The Bernardo Fight Club is a Play to Earn game built on the BSC.
          </Heading>
          <div style={{paddingBottom: '20px', paddingTop: '30px', textAlign: "center"}}>
            <img src="/images/BFC-timeline.png" alt="info" />
          </div>
          <Text mb="3" color="text" style={{fontSize:'18px'}}>
            Hold an NFT / Stake LP to get a free portal, or get whitelisted to access the distribution presale. (*whitelisting process will start soon)
          </Text>
          <Text mb="3" color="text" style={{fontSize:'18px'}}>
            A portal allows you to <span style={{fontWeight: 'bold'}}>mint your bernardo with random stats</span> generated with Chainlink VRF.
            <span style={{fontWeight: 'bold'}}> Chances</span> to mint the rarest bernardo possible are the <span style={{fontWeight: 'bold'}}>same for everyone</span>. You can buy portals/mint bernardos as much as you want.
          </Text>
          <div style={{paddingBottom: '20px', paddingTop: '30px', textAlign: "center"}}>
            <img src="/images/BFC_table.png" alt="info" />
          </div>
          <Text mb="3" color="text" style={{fontSize:'18px'}}>
            Bernardo is your doggo, take care of him, give him love/food/equipment and <span style={{fontWeight: 'bold'}}>he will give his life for you</span>.
            Participate in raffles to win gear or use superbiscuits to boost your Rarity Score (RS), and <span style={{fontWeight: 'bold'}}>challenge players to win the RS farming contests.</span>
          </Text>
          <Text mb="3" color="text" style={{fontSize:'18px'}}>
            Once ready, send bernardo into the arenas, to fight big boys and other players. <span style={{fontWeight: 'bold'}}>A well trained bernardo is a cash machine.</span>
          </Text>
          <Heading size="lg" color="secondary" mb="3">
          100 % of The Bernardo Fight Club economy is redistributed to players and bernard.finance ecosystem.
          </Heading>

          <div style={{paddingBottom: '20px', paddingTop: '30px', textAlign: "center"}}>
            <img  src="/images/BFC-infography.png" alt="info" />
          </div>

          <Text style={{textAlign: 'center'}}>
            <Button as="a" target="_blank" href="https://bernard-finance.gitbook.io/bernardswap/the-bernardo-fight-club/portals-distribution-presale" mt="15px" variant="primary" style={{textAlign: 'center', borderColor: 'transparent', background: 'linear-gradient(90deg, #2163e2 30%, #ee002f 100%)'}}>
              Learn More
            </Button>
          </Text>

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
  background: 'linear-gradient(90deg, #ee002f 30%, #2163e2 100%)',
  '-webkitBackgroundClip': 'text',
  '-webkitTextFillColor': 'transparent',
}));

export default BFC
