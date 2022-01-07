import React, { useState,useCallback } from 'react'
import { Image, Heading, Text, Button, Flex, PrizeIcon, VoteIcon, Won, Input, useModal} from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import useTokenBalance from 'hooks/useTokenBalance'
import { getBalanceNumber } from 'utils/formatBalance'
import { useClaimBets } from 'hooks/useBetBets'

import { getCakeAddress, getBetsAddress } from 'utils/addressHelpers'
import Page from 'components/layout/Page'
import Container from 'components/layout/Container'
import BetsModal from './BetsModal'

interface Props {
    b?: any
}
const BetsLine: React.FC<Props> = ({ b }) => {
  const [showExpandableSection, setShowExpandableSection] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)

  const totalBones = parseFloat(b.homeBones) + parseFloat(b.awayBones) + parseFloat(b.drawBones);
  const percentHome = (parseFloat(b.homeBones) * 100) / totalBones;
  const percentAway = (parseFloat(b.awayBones) * 100) / totalBones;
  const percentDraw = (parseFloat(b.drawBones) * 100) / totalBones;
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const inputId = b.id
  const cakeBalance = useTokenBalance(getCakeAddress())
  const [onPresentBuy] = useModal(<BetsModal max={cakeBalance} tokenName="$BONES" betId={inputId} betName={b.name} home={b.home} away={b.away}/>)

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setValue(inputValue)
  }
  const formatDate = (dateString) => {
    const ts = new Date(dateString * 1000)
    return new Intl.DateTimeFormat(undefined, {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(ts)
  }

  const { onClaim } = useClaimBets()

  const handleClaim = useCallback(async () => {
    try {
      await onClaim(inputId);

    } catch (e) {
      console.error(e)
    }
  }, [inputId, onClaim])

  let betSide = ''
  if (b.amountBet) {
    if (b.sideBet === 0) {
      betSide = b.home
    }
    if (b.sideBet === 1) {
      betSide = 'Draw'
    }
    if (b.sideBet === 2) {
      betSide = b.away
    }
  }

  return(
    <div key={b.id} style={{borderBottom: '#eeeeee52 1px solid', padding: '20px 0'}}>
      <FlexCard justifyContent='space-between' >
        <TextCard>{b.name} <br/><span style={{fontSize: '13px'}}>({formatDate(b.startDate)})</span></TextCard>
        <TextCard>{b.home} ({percentHome.toLocaleString(undefined, { maximumFractionDigits: 0 })}%)<br/> <span style={{fontSize: '13px'}}>{getBalanceNumber(b.homeBones)} $BONES</span></TextCard>
        <TextCard>DRAW ({percentDraw.toLocaleString(undefined, { maximumFractionDigits: 0 })}%)<br/> <span style={{fontSize: '13px'}}>{getBalanceNumber(b.drawBones)} $BONES</span> </TextCard>
        <TextCard >{b.away} ({percentAway.toLocaleString(undefined, { maximumFractionDigits: 0 })}%)<br/> <span style={{fontSize: '13px'}}>{getBalanceNumber(b.awayBones)} $BONES</span></TextCard>
        {!b.finished && !b.amountBet ?
          <>
            <ButtonCard onClick={onPresentBuy} variant="primary" >
              Bets
            </ButtonCard>
          </>
          : null
        }

        {!b.finished && b.amountBet > 0 ?
          <>
            <TextCard style={{color: "#5DCE80"}}>You bet {getBalanceNumber(b.amountBet)} $BONES on {betSide}<br/></TextCard>
          </>
          : null
        }

        {b.claimable && !b.claimed && (
          <ButtonCard  variant="primary" disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await handleClaim()
            setPendingTx(false)
          }}>
            Claim
          </ButtonCard>
          )
        }

        {b.claimable && b.claimed && (
          <TextCard style={{color: "orange"}}>Already claimed</TextCard>
          )
        }

        {!b.claimable && b.finished && b.amountBet > 0 && (
          <TextCard style={{color: "red"}}>You lost :(</TextCard>
          )
        }

        {!b.claimable && b.finished && !b.amountBet && (
          <TextCard style={{color: "red"}}>you did not bet :(</TextCard>
          )
        }

      </FlexCard>
    </div>
  )
}

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`
const FlexCard = styled(Flex)`
  justify-content: center;
  padding-top: 20px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

`
const ExpandableDiv = styled.div`
  width: 10%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }

`

const WrapperDiv = styled.div`
  padding-left: 20px;
  @media screen and (max-width: 768px) {
    padding-left: 0;
    padding-top: 15px;
  }

`
const InputBets = styled(Input)`
  width: 40%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }

`
const TextCard = styled(Text)`
  width: 20%;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-bottom: 20px;
  }

`

const ButtonCard = styled(Button)`
  width: 20%;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-bottom: 20px;
  }

`

export default BetsLine
