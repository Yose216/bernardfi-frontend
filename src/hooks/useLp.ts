import BigNumber from 'bignumber.js'
import { useBarrelLP, useBernLP } from 'hooks/useContract'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { getPriceLp } from '../utils/callHelpers'

const ZERO = 0

export const priceBarrelBusd = async () => {
  const { account } = useWallet()
  const barrelLpContract = await useBarrelLP()
  let price = 0;
  try {
    const response = await getPriceLp(barrelLpContract, account)
    price = parseFloat(response[1]) / parseFloat(response[0])

    return [price]

  } catch (e) {
    console.log(e)

    return [ZERO]
  }
}

export const priceBernBusd = async () => {
  const { account } = useWallet()
  const bernLpContract = await useBernLP()
  let price = 0;

  try {
    const response = await getPriceLp(bernLpContract, account)
    price = parseFloat(response[1]) / parseFloat(response[0])
    return [price]

  } catch (e) {
    return [ZERO]
  }
}
