import { useCallback, useState, useEffect } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useBets } from 'hooks/useContract'
import { claim, bet } from '../utils/callHelpers'

export const useClaimBets = () => {
  const { account } = useWallet()
  const betsContract = useBets()

  const handleClaim = useCallback(async (id: number) => {
    try {
      const txHash = await claim(betsContract, id, account)
      return txHash
    } catch (e) {
      console.log(e)
      return false
    }
  }, [account, betsContract])

  return { onClaim: handleClaim }
}

export const useBuyBet = () => {
  const { account } = useWallet()
  const betsContract = useBets()

  const handleBuy = useCallback(
    async (id: number, amount: string, side: number) => {
      try {
        console.log(3)
        const txHash = await bet(betsContract, id, amount, side, account)
        console.log(txHash)
        return txHash
      } catch (e) {
        console.log(e)
        return false
      }
    },
    [account, betsContract],
  )

  return { onBuy: handleBuy }
}
