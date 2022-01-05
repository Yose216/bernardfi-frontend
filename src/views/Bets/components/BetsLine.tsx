import React, { useState } from 'react'
import { Image, Heading, Text, Button, Flex, PrizeIcon, VoteIcon, Won, Input, useModal} from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import useTokenBalance from 'hooks/useTokenBalance'
import { getBalanceNumber } from 'utils/formatBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import Page from 'components/layout/Page'
import Container from 'components/layout/Container'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import BetsModal from './BetsModal'

interface Props {
    bets?: any
    color?: string
}
const BetsLine: React.FC<Props> = ({ bets, color }) => {
  return (
    <>
    {bets.map(b => {
      const [showExpandableSection, setShowExpandableSection] = useState(false)
      const totalBones = parseFloat(b.homeBones) + parseFloat(b.awayBones) + parseFloat(b.drawBones);
      const percentHome = (b.homeBones * 100) / totalBones;
      const percentAway = (b.awayBones*100) / totalBones;
      const percentDraw = (b.drawBones*100) / totalBones;
      const [value, setValue] = useState('')
      const [isLoading, setIsLoading] = useState(false)
      const [error, setError] = useState(null)
      const inputId = b.epoch
      const cakeBalance = useTokenBalance(getCakeAddress())
      const [onPresentBuy] = useModal(<BetsModal max={cakeBalance} tokenName="$BONES" betId={inputId} betName={b.name}/>)



      const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { value: inputValue } = evt.target
        setValue(inputValue)
      }
      const formatDate = (dateString) => {
        const ts = new Date(dateString * 1000)
        return new Intl.DateTimeFormat(undefined, {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(ts)
      }

      return(
        <div key={b.epoch} style={{borderBottom: '#eeeeee52 1px solid', padding: '20px 0'}}>
          <FlexCard justifyContent='space-between' >
            <TextCard>{b.name} <br/><span style={{fontSize: '13px'}}>({formatDate(b.date)})</span></TextCard>
            <TextCard>{b.home} ({percentHome.toLocaleString(undefined, { maximumFractionDigits: 0 })}%)<br/> <span style={{fontSize: '13px'}}>{b.homeBones} $BONES</span></TextCard>
            <TextCard>DRAW ({percentDraw.toLocaleString(undefined, { maximumFractionDigits: 0 })}%)<br/> <span style={{fontSize: '13px'}}>{b.drawBones} $BONES</span> </TextCard>
            <TextCard >{b.away} ({percentAway.toLocaleString(undefined, { maximumFractionDigits: 0 })}%)<br/> <span style={{fontSize: '13px'}}>{b.awayBones} $BONES</span></TextCard>
            {true ?
              <>
                <Button onClick={onPresentBuy} variant="primary" >
                  Bets
                </Button>
              </>
              : null
            }

            {false ?
              <Button as="a" href="/farms" variant="primary" >
                Approve
              </Button>
              : null
            }

            {false ?
              <Button as="a" href="/farms" variant="primary" >
                Claim
              </Button>
              : null
            }

          </FlexCard>
        </div>
      )

    })}
    </>
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

export default BetsLine
