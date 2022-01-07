import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal } from '@pancakeswap-libs/uikit'
import { useBuyBet } from 'hooks/useBetBets'
import styled from 'styled-components'
import ModalActions from 'components/ModalActions'
import TokenInput from 'components/TokenInput'
import useI18n from 'hooks/useI18n'
import { getFullDisplayBalance } from 'utils/formatBalance'

interface BetsModalProps {
  max: BigNumber
  betId: number
  betName: string
  home: string
  away: string
  onDismiss?: () => void
  tokenName?: string
}

const BetsModal: React.FC<BetsModalProps> = ({ max, betId, betName, home, away, onDismiss, tokenName = ''}) => {
  const [val, setVal] = useState('')
  const [side, setSide] = useState("home")
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleChangeSide = useCallback(
    (e: React.FormEvent<HTMLSelectElement>) => {
      setSide(e.currentTarget.value)
    },
    [setSide],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  const { onBuy } = useBuyBet()

  const handleBets = useCallback(async () => {
    try {
      let sideNum = 0;
      if (side === "home") {
        sideNum = 0
      } else if (side === "away") {
        sideNum = 2
      } else {
        sideNum = 1
      }

      await onBuy(betId, val, sideNum);
    } catch (e) {
      console.error(e)
    }
  }, [val, betId, side, onBuy])

  return (
    <Modal title={betName} onDismiss={onDismiss}>
      <DivSelect value={side} onChange={handleChangeSide}>
        <option value="home">{home}</option>
        <option value="draw">Draw</option>
        <option value="away">{away}</option>
      </DivSelect>

        <TokenInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={fullBalance}
          symbol={tokenName}
        />
      <ModalActions>
        <Button variant="secondary" onClick={onDismiss}>
          {TranslateString(462, 'Cancel')}
        </Button>
        <Button
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await handleBets()
            setPendingTx(false)
            onDismiss()
          }}
        >
          {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Confirm')}
        </Button>
      </ModalActions>
    </Modal>
  )
}

const DivSelect = styled.select`
  width: 100%;
  min-width: 15ch;
  max-width: 30ch;
  border: 1px solid var(--select-border);
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: #45346B;
  background-image: linear-gradient(to top, #45346B, #45346B 33%);
  color: #f9f9f9;

`

export default BetsModal
