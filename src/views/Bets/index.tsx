import React, { useState, useEffect, useCallback } from 'react'
import { Image, Heading, Text, Button, Flex, PrizeIcon, VoteIcon, Won} from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import useTokenBalance from 'hooks/useTokenBalance'
import Countdown from 'react-countdown';
import UnlockButton from 'components/UnlockButton'

import { useBets } from 'state/hooks'
import { useBetsApprove } from 'hooks/useApprove'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useBetsAllowance } from 'hooks/useAllowance'
import { useDispatch } from 'react-redux'
import useRefresh from 'hooks/useRefresh'
import { fetchBetsPublicDataAsync } from 'state/actions'
import { getBalanceNumber } from 'utils/formatBalance'
import { getCakeAddress, getBetsAddress } from 'utils/addressHelpers'
import Page from 'components/layout/Page'
import Container from 'components/layout/Container'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import BetsLine from './components/BetsLine'

const Bets: React.FC = () => {
  const bets = useBets()
  const { account } = useWallet()
  const bonesBalance = getBalanceNumber(useTokenBalance(getCakeAddress()))
  const [showExpandableSection, setShowExpandableSection] = useState(false)
  const [showExpandableSectionOther, setShowExpandableSectionOther] = useState(false)

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchBetsPublicDataAsync(account))
  }, [ dispatch, fastRefresh, account])
  const [requestedApproval, setRequestedApproval] = useState(false)
  const allowance = useBetsAllowance(account)
  const { onApprove } = useBetsApprove(account)
  const betsSport = [];
  const betsSportOld = [];
  const betsOther = [];
  const betsOtherOld = [];

  let betsWin = 0;
  if (bets) {
    bets.map((b) => {
        if (b.type === 'sport') {
          if (!b.finished) {
            betsSport.push(b);
          } else {
            betsSportOld.push(b);

          }
        }
        if(b.type === 'other') {
          if (!b.finished) {
            betsOther.push(b);
          } else {
            betsOther.push(b);

          }
        }

        if (b.claimable === true) {
          betsWin += 1
        }

      return 0;
    })

    betsSport.sort((a,b)=> (a.startDate > b.startDate ? 1 : -1))
    betsSportOld.sort((a,b)=> (a.startDate > b.startDate ? 1 : -1))
    betsOther.sort((a,b)=> (a.startDate > b.startDate ? 1 : -1))
    betsOtherOld.sort((a,b)=> (a.startDate > b.startDate ? 1 : -1))
  }

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)

    } catch (e) {
      console.error(e)
    }
  }, [onApprove])

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (days !== 0) {
      return (
        `${days} days and ${hours} hours remainings`
      )
    }
    return (
      `${hours}:${minutes}:${seconds} remainings`
    )
};
  return (
    <>
      <Outer>
        <Inner>
          <Heading as="h1" size="xxl" color="#ffc00b" mb="24px">
            The Bernardo Bets
          </Heading>
          <Heading size="md" color="text">
            Spend your $BONES to compete against other players and win the jackpot !
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
                <Heading mb="4px" ml="3" color="primary" style={{fontSize:'50px'}}>{bonesBalance.toLocaleString(undefined, {maximumFractionDigits: 2,})}</Heading>
              </Wrapper>

            </CardBodyData>
            <CardBodyData >
              <Wrapper mb="12px">
                <PrizeIcon color="secondary" width="40px"/>
                <Flex flexDirection="column" >
                  <Text ml="3" style={{fontSize:'20px'}}>$BONES Jackpot </Text>
                  <Text ml="3" style={{fontSize:'12px'}}>Show your skills in betting and win the Jackpot each month. Biggest gambler will take it all.</Text>

                </Flex>
              </Wrapper>
              <Wrapper style={{minHeight: '100px'}}>
                <Heading mb="4px" ml="3" color="secondary" style={{fontSize:'50px'}}>2 BNB to win</Heading>
              </Wrapper>
              <Wrapper >
                <Text ml="3" style={{fontSize:'14px'}}>Next winner picked in: <Countdown date={1646002800000} renderer={renderer}/></Text>
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
                <Heading mb="4px" ml="3" color="#ffc00b" style={{fontSize:'50px'}}>{betsWin}</Heading>
              </Wrapper>


            </CardBodyData>
          </FlexData>

          <FlexToken>
            <CardBodyToken className="sport">
              <Wrapper mb="12px" style={{minHeight: '100px'}}>
                <FlexBern>
                  <img style={{minWidth: '200px'}} src="images/bets_2.png" alt="logo" width={200} height={200} />
                  <Heading mb="4px" ml="3" style={{fontSize:'33px'}}>
                    Sports<br/>
                    <span style={{fontSize:'16px'}}>Bet on the match result (excluding extra-time and penalty shoot-out).</span>

                  </Heading>

                </FlexBern>
              </Wrapper>
              <Wrapper mb="12px" style={{justifyContent: 'center'}}>
              {!account ?
                <UnlockButton mt="8px" style={{textAlign: 'center'}}/>
                : null
              }
              { allowance.toString() === "0" && account ?
                <Button variant="primary" disabled={requestedApproval} onClick={handleApprove} >
                  Approve
                </Button>
                : null
              }
              </Wrapper>

              { allowance.toString() !== "0" && account ?
                betsSport.map(b => {
                  if (account) {
                    return(<BetsLine b={b} key={b.id}/>)
                  }

                    return null
                })
                :
                null
              }
              {allowance.toString() !== "0" && account  ?
                <>
                  <ExpandableSectionButton
                    onClick={() => setShowExpandableSection(!showExpandableSection)}
                    expanded={showExpandableSection}
                    showText="Old Bets"
                  />
                  <ExpandingWrapper expanded={showExpandableSection}>
                  {betsSportOld.map(b => {
                    if (account) {
                      return(<BetsLine b={b} key={b.id}/>)
                    }

                    return null

                  })}
                  </ExpandingWrapper>
                </>
              : null
              }


            </CardBodyToken>

            <CardBodyToken className="others">
              <Wrapper mb="12px" style={{minHeight: '100px'}}>
                <FlexBern>
                  <img style={{minWidth: '200px'}} src="images/bets_1.png" alt="logo" width={200} height={200} />
                  <Heading mb="4px" ml="3" style={{fontSize:'33px', textAlign: "center"}}>Others</Heading>
                </FlexBern>
              </Wrapper>
              <Wrapper mb="12px" style={{justifyContent: 'center'}}>
                {!account ?
                  <UnlockButton mt="8px" style={{textAlign: 'center'}}/>
                  : null
                }
                { allowance.toString() === "0" && account ?
                  <Button variant="primary" disabled={requestedApproval} onClick={handleApprove} >
                    Approve
                  </Button>
                  : null
                }
              </Wrapper>
              {allowance.toString() !== "0" && account  ?
                betsOther.map(b => {
                  if (account ) {
                    return(<BetsLine b={b} key={b.id}/>)
                  }

                    return null
                }) :
                null
              }
              {allowance.toString() !== "0" && account ?
                <>
                  <ExpandableSectionButton
                    onClick={() => setShowExpandableSectionOther(!showExpandableSectionOther)}
                    expanded={showExpandableSectionOther}
                    showText="Old Bets"
                  />
                  <ExpandingWrapper expanded={showExpandableSectionOther}>
                  {betsOtherOld.map(b => {
                    if (account) {
                      return(<BetsLine b={b} key={b.id}/>)
                    }

                    return null

                  })}
                  </ExpandingWrapper>
                </>
              : null
              }
            </CardBodyToken>

            <Wrapper mt="12px" style={{justifyContent: 'center'}}>
              <Button target="_blank" variant="primary" as="a" href="https://bernard-finance.gitbook.io/bernardswap/how-to/play-the-bernardo-bets" >
                LEARN MORE
              </Button>
            </Wrapper>
          </FlexToken>
        </Flex>
      </Page>
    </>
  )
}


const Outer = styled.div`
  background: linear-gradient(130deg, #5b00a3 0%, #22201f 50%, #bb8b00 100%);
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
    background: linear-gradient(180deg, #27262cb3 15%, #bb8b00 100%);
  },
  align-self: baseline;
  border-radius: 32px;
  width: 100%;
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

const FlexBern = styled(Flex)`
flex-direction: row;
justify-content: center;
align-items: center;
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
