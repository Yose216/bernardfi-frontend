import React, { useState } from 'react'
import { Image, Heading, Text, Button, Flex, PrizeIcon, VoteIcon, Won} from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import useTokenBalance from 'hooks/useTokenBalance'
import { getBalanceNumber } from 'utils/formatBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import Page from 'components/layout/Page'
import Container from 'components/layout/Container'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import BetsLine from './components/BetsLine'


const Bets: React.FC = () => {
  const bonesBalance = getBalanceNumber(useTokenBalance(getCakeAddress()))
  const [showExpandableSection, setShowExpandableSection] = useState(false)
  const bets = {
    "sports":
      [
        {"epoch": "1","name": "PSG-OM", "date": "1641550788", "home": "PSG", "away": "OM", "homeBones": "150", "drawBones": "45", "awayBones": "15"},
        {"epoch": "2","name": "FC Barcelone-Real Madrid FC", "date": "1641550788", "home": "FC Barcelone", "away": "Real Madrid FC", "homeBones": "100", "drawBones": "150", "awayBones": "100"},
        {"epoch": "3","name": "Stade Rennais-FC Nantes", "date": "1641550788", "home": "Stade Rennais", "away": "FC Nantes", "homeBones": "1", "drawBones": "50", "awayBones": "15"},
      ],

    "others":
      [
        {"epoch": "4","name": "XXX-XXXX", "date": "1641550788", "home": "XXX", "away": "XXXX", "homeBones": "150", "drawBones": "45", "awayBones": "15"},
        {"epoch": "5","name": "XXX-XXXX", "date": "1641550788", "home": "XXX", "away": "XXXX", "homeBones": "30", "drawBones": "100", "awayBones": "30"},
        {"epoch": "6","name": "XXX-XXXX", "date": "1641550788", "home": "XXX", "away": "XXXX", "homeBones": "15", "drawBones": "75", "awayBones": "80"},
      ],
  }

  console.log(bets);
  return (
    <>
      <Outer>
        <Inner>
          <Heading as="h1" size="xxl" color="#ffc00b" mb="24px">
            Bets
          </Heading>
          <Heading size="md" color="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Heading>

        </Inner>
      </Outer>
      <Page style={{justifyContent: 'center', alignItems: 'center', flex: 1, display: 'flex', minHeight: '0px'}}>
        <Flex flexDirection="column" style={{width: '80%', margin: '50px 0'}} >
          <FlexData>
            <CardBodyData >
              <Wrapper mb="12px">
                <VoteIcon color="primary" width="40px"/>
                <Flex flexDirection="column" >
                  <Text mb="4px" ml="3" style={{fontSize:'20px'}}>$BONES availaible to bet</Text>
                </Flex>
              </Wrapper>
              <Wrapper mb="12px" style={{minHeight: '100px'}}>
                <Heading mb="4px" ml="3" color="primary" style={{fontSize:'50px'}}>{bonesBalance}</Heading>
              </Wrapper>

            </CardBodyData>
            <CardBodyData >
              <Wrapper mb="12px">
                <PrizeIcon color="secondary" width="40px"/>
                <Flex flexDirection="column" >
                  <Text mb="4px" ml="3" style={{fontSize:'20px'}}>$BONES Jackpot</Text>
                </Flex>
              </Wrapper>
              <Wrapper mb="12px" style={{minHeight: '100px'}}>
                <Heading mb="4px" ml="3" color="secondary" style={{fontSize:'50px'}}>$120,000</Heading>
              </Wrapper>
            </CardBodyData>
            <CardBodyData >
              <Wrapper mb="12px">
                <Won color="#fff" width="40px"/>
                <Flex flexDirection="column" >
                  <Text mb="4px" ml="3" style={{fontSize:'20px'}}>Number of bets won</Text>
                </Flex>
              </Wrapper>
              <Wrapper mb="12px" style={{minHeight: '100px'}}>
                <Heading mb="4px" ml="3" color="#ffc00b" style={{fontSize:'50px'}}>13</Heading>
              </Wrapper>


            </CardBodyData>
          </FlexData>

          <FlexToken>
            <CardBodyToken className="sport">
              <Wrapper mb="12px">
                <Image src="images/bets_2.png" alt="logo" width={100} height={100} />
                <Flex flexDirection="column" >
                  <Heading mb="4px" ml="3" style={{fontSize:'33px'}}>Sports</Heading>
                </Flex>
              </Wrapper>
              <Wrapper mb="12px" style={{minHeight: '100px'}}>
                <Text fontSize="15px">Sed gravida, mi non bibendum volutpat, elit velit rhoncus neque, ac consequat erat ligula vitae nunc. Donec iaculis diam sed consequat rutrum. Integer lobortis bibendum felis. Donec rutrum dictum urna, id laoreet odio eleifend eu. Nulla varius ac tellus a porta. Aliquam sollicitudin tincidunt lacus sit amet molestie. Curabitur lectus justo, fringilla sed neque tempus, porttitor dictum turpis. Pellentesque rutrum, nisl vitae tincidunt vehicula.</Text>
              </Wrapper>
              <BetsLine bets={bets.sports} color="#ffc00b"/>
            </CardBodyToken>

            <CardBodyToken className="others">
              <Wrapper mb="12px">
              <Image src="images/bets_1.png" alt="logo" width={100} height={100} />
                <Flex flexDirection="column" >
                  <Heading mb="4px" ml="3" style={{fontSize:'33px'}}>Others</Heading>
                </Flex>
              </Wrapper>
              <Wrapper mb="12px" style={{minHeight: '100px'}}>
                <Text fontSize="15px">Sed gravida, mi non bibendum volutpat, elit velit rhoncus neque, ac consequat erat ligula vitae nunc. Donec iaculis diam sed consequat rutrum. Integer lobortis bibendum felis. Donec rutrum dictum urna, id laoreet odio eleifend eu. Nulla varius ac tellus a porta. Aliquam sollicitudin tincidunt lacus sit amet molestie. Curabitur lectus justo, fringilla sed neque tempus, porttitor dictum turpis. Pellentesque rutrum, nisl vitae tincidunt vehicula.</Text>
              </Wrapper>
              <BetsLine bets={bets.others} color="#5b00a3"/>
            </CardBodyToken>

          </FlexToken>
        </Flex>
      </Page>
    </>
  )
}


const Outer = styled.div`
  background: linear-gradient(130deg, #5b00a3 0%, #22201f 50%, #ffc00b 100%);
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

const CardBodyToken = styled.div`
  &.sport {
    background: linear-gradient(180deg, #27262cb3 15%, #5b00a3 100%);
  },
  &.other {
    background: linear-gradient(180deg, #27262cb3 15%, #ffc00b 100%);
  },
  align-self: baseline;
  border-radius: 32px;
  width: 80%;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  padding: 24px;
  position: relative;
  justify-content: center;
  margin-bottom: 30px;
  @media screen and (max-width:968px) {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 90%;
  }
`

const FlexToken = styled(Flex)`
flex-direction: column;
justify-content: center;
align-items: center;

`

const FlexData = styled(Flex)`
flex-direction: row;
justify-content: space-between;
align-items: space-between;
@media screen and (max-width:968px) {
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

`

const CardBodyData = styled.div`
  background: #27262cb3;
  align-self: baseline;
  border-radius: 32px;
  width: 30%;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  padding: 24px;
  position: relative;
  justify-content: center;
  margin-bottom: 30px;
  @media screen and (max-width:968px) {
    width: 100%;
  }
`
const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`
const Wrapper = styled(Flex)`
  align-items: center;
`

export default Bets
