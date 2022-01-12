import React from 'react'
import { Image, Heading, Text, Button, Flex} from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import Container from 'components/layout/Container'

const Info: React.FC = () => {
  return (
    <>
      <Outer>
        <Inner>
          <Heading as="h1" size="xxl" color="primary" mb="24px">
            Infos
          </Heading>
          <Heading size="lg" color="text">
            Understand our ecosystem.
          </Heading>
        </Inner>
      </Outer>
      <Page style={{justifyContent: 'center', alignItems: 'center', flex: 1, display: 'flex', minHeight: '0px'}}>
        <Flex flexDirection="column" style={{width: '80%', margin: '50px 0'}} >
          <Heading size="lg" color="secondary" mb="3">
            bernard.finance is a complete DeFi ecosystem that allows for multiple tokens with proprietary
            mechanics and a complete swap/staking/NFT marketplace/gaming platform aka bernardswap.
          </Heading>
          <Text mb="3" color="text" style={{fontSize:'18px'}}>
            Our tokens $BERN, $BARREL and $BONES are designed to suit various investor profiles and to bring balance to a powerful ecosystem.
          </Text>
          <Text mb="" color="text" style={{fontSize:'18px'}}>
            Behind the scene works our algo trading account that fuels everything while taking advantage of
            market weaknesses. Its exceptionnal results shown since mid 2021 are proofs of sustainability and
            bear-market resistance for our assets. It has always been our first priority, make sure to take care of
            your capital in all conditions.
          </Text>
          <Wrapper mt="12px" style={{justifyContent: 'center'}}>
            <Button as="a" target="_blank" href="https://bernard-finance.gitbook.io/bernardswap/infos/ecosystem-in-details" mt="15px" variant="primary" style={{textAlign: 'center'}}>
              LEARN MORE
            </Button>
          </Wrapper>


          <Flex flexDirection="column">
            <FlexToken>
              <CardBodyToken className="bern">
                <Wrapper mb="12px">
                  <Image src="images/bern.png" alt="logo" width={60} height={60} />
                  <Flex flexDirection="column" >
                    <Heading mb="4px" ml="3" style={{fontSize:'33px'}}>$BERN</Heading>
                  </Flex>
                </Wrapper>
                <Wrapper mb="12px" style={{minHeight: '100px'}}>
                  <Text fontSize="15px">$BERN is a community coin with a reflection tax to grow holders bags. It is bought back by our NFT sells.</Text>
                </Wrapper>
                <Wrapper mb="12px" style={{minHeight: '20px'}}>
                  <Text fontSize="15px">10% tax on transactions.</Text>
                </Wrapper>

                <Flex justifyContent='space-between' mb="4">
                  <Text>Tax:</Text>
                  <Text>5% to holders<br/>5% burned</Text>
                </Flex>

                <Flex justifyContent='center'>
                  <Button target="_blank" as="a" href="https://swap.bernard.finance/#/swap?outputCurrency=0x27d0408a868cf4e89b37d20b5e32888dced95bcb" mr="5px" mt="8px" variant="primary">
                    BUY
                  </Button>
                  <Button as="a" target="_blank" href="https://bernard-finance.gitbook.io/bernardswap/tokenomics/usdbern" mt="8px" variant="secondary" style={{color: '#fff', borderColor: '#fff'}}>
                    LEARN MORE
                  </Button>
                </Flex>
              </CardBodyToken>
              <CardBodyToken className="barrel">
                <Wrapper mb="12px">
                  <Image src="images/barrel.png" alt="logo" width={60} height={60} />
                  <Flex flexDirection="column" >
                    <Heading mb="4px" ml="3" style={{fontSize:'33px'}}>$BARREL</Heading>
                  </Flex>
                </Wrapper>
                <Wrapper mb="12px" style={{minHeight: '100px'}}>
                  <Text fontSize="15px">$BARREL is our second pillar, backed by an algorithmic trading account and a buyback tax. Steady growth over time, this is the perfect store of value.</Text>
                </Wrapper>
                <Wrapper mb="12px" style={{minHeight: '20px'}}>
                  <Text fontSize="15px">10% tax on sells only.</Text>
                </Wrapper>

                <Flex justifyContent='space-between' mb="4">
                  <Text>Tax:</Text>
                  <Text>6% auto buyback<br/>4% to marketing</Text>
                </Flex>

                <Flex justifyContent='center'>
                  <Button as="a" target="_blank" href="https://swap.bernard.finance/#/swap?outputCurrency=0xdb1b7a685e6876d508de3c5160764b56577a83ae" mr="5px" mt="8px" style={{background: '#E65409', borderColor: '#E65409'}}>
                    BUY
                  </Button>
                  <Button as="a" target="_blank" variant="secondary" href="https://bernard-finance.gitbook.io/bernardswap/tokenomics/usdbarrel" mt="8px" style={{color: '#fff', borderColor: '#fff'}}>
                    LEARN MORE
                  </Button>
                </Flex>
              </CardBodyToken>
              <CardBodyToken className="bones">
                <Wrapper mb="12px">
                  <Image src="images/bones.png" alt="logo" width={60} height={60} />
                  <Flex flexDirection="column" >
                    <Heading mb="4px" ml="3" style={{fontSize:'33px'}}>$BONES</Heading>
                  </Flex>
                </Wrapper>
                <Wrapper mb="12px" style={{minHeight: '100px'}}>
                  <Text fontSize="15px">$BONES is the currency of bernardswap. It is earned via high reward staking and farming, and spent to play on our platform.</Text>
                </Wrapper>
                <Wrapper mb="12px" style={{minHeight: '20px'}}>
                  <Text fontSize="15px">10% tax on sells only.</Text>
                </Wrapper>

                <Flex justifyContent='space-between' mb="4">
                  <Text>Tax:</Text>
                  <Text>5% to algo<br/>1% to charity<br/>4% to marketing</Text>
                </Flex>

                <Flex justifyContent='center'>
                  <Button as="a" target="_blank" href="https://swap.bernard.finance/#/swap?outputCurrency=0x612b5c1a2d7e94d03dddd53d459d4b944903497d" mr="5px" mt="8px" style={{background: '#d4a96f', borderColor: '#d4a96f'}}>
                    BUY
                  </Button>
                  <Button as="a" target="_blank" style={{color: '#fff', borderColor: '#fff'}} href="https://bernard-finance.gitbook.io/bernardswap/tokenomics/usdbones" mt="8px" variant="secondary">
                    LEARN MORE
                  </Button>
                </Flex>

              </CardBodyToken>
            </FlexToken>
          </Flex>
          <Text mb="5" color="text" style={{fontSize:'18px'}}>
            Our NFT gateway system triggers powerstaking, meaning high sustained rewards overtime.
            We designed the whole system to become self sufficient. Every move from users triggers a buyback
            somewhere else to maintain a circular economy exploiting DeFi mechanics and algorithms.
          </Text>

          <div style={{textAlign: "center"}}>
            <img width="800px" src="/images/test.svg" alt="info" />
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
`

const CardBodyToken = styled.div`
  &.bern {
    background: linear-gradient(180deg, #27262cb3 15%, #548d65 100%);
  },
  &.barrel {
    background: linear-gradient(180deg, #27262cb3 15%, #FD7C02 100%);
  },
  &.bones {
    background: linear-gradient(180deg, #27262cb3 15%, #856a46 100%);
  },
  align-self: baseline;
  border-radius: 32px;
  width: 30%;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  padding: 24px;
  position: relative;
  justify-content: center;
  margin-top: 60px;
  margin-bottom: 60px;
  @media screen and (max-width:968px) {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 90%;
  }
`

const FlexToken = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
  @media screen and (max-width:968px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

`

const Wrapper = styled(Flex)`
  svg {
    margin-right: 0.25rem;
  }
  align-items: center;
`

export default Info
