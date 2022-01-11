import React from 'react'
import { Image, Heading, Text, Button, Flex} from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import Container from 'components/layout/Container'

const Marketplace: React.FC = () => {
  return (
    <>
      <Outer>
        <Inner>
          <Heading as="h1" size="xxl" color="primary" mb="24px">
            NFT Marketplace (coming soon)
          </Heading>
        </Inner>
      </Outer>

      <Page style={{justifyContent: 'center', alignItems: 'center', flex: 1, display: 'flex', minHeight: '0px', padding: '30px'}}>
        <Heading size="lg" color="orange">
          Our NFT marketplace is under construction.<br/>
          But bernard.finance NFTs are available on our <a href="https://www.featured.market/profile/bernard_finance" rel="noreferrer" target="_blank" style={{color: "#5DCE80", textDecoration: 'underline'}}>partner platform</a>.<br/>
          Soon you will be able to buy, sell, trade bernard.finance seasonal NFTs and The Bernardo Fight Club items on bernardswap.
        </Heading>
      </Page>
      <Page style={{justifyContent: 'center', alignItems: 'center', flex: 1, display: 'flex', minHeight: '0px'}}>
        <img width="700px" src="/images/worker.png" alt="info" />
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

export default Marketplace
