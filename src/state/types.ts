import BigNumber from 'bignumber.js'
import { FarmConfig, PoolConfig, BetsConfig } from 'config/constants/types'

export interface Farm extends FarmConfig {
  tokenAmount?: BigNumber
  // quoteTokenAmount?: BigNumber
  lpTotalInQuoteToken?: BigNumber
  tokenPriceVsQuote?: BigNumber
  poolWeight?: number
  depositFeeBP?: number
  BONESPerBlock?: number
    userData?: {
    allowance: BigNumber
    tokenBalance: BigNumber
    stakedBalance: BigNumber
    earnings: BigNumber
  }
}

export interface Pool extends PoolConfig {
  totalStaked?: BigNumber
  startBlock?: number
  endBlock?: number
  userData?: {
    allowance: BigNumber
    stakingTokenBalance: BigNumber
    stakedBalance: BigNumber
    pendingReward: BigNumber
  }
}

export interface Bets extends BetsConfig {
  name: string
  home: string
  away: string
  startDate: number
  homeBones: number
  drawBones: number
  awayBones: number
  finished: number
  amountBet: number
  sideBet: number
  type: string
  claimed: boolean
  claimable: boolean
}

// Slices states

export interface FarmsState {
  data: Farm[]
}

export interface PoolsState {
  data: Pool[]
}

export interface BetsState {
  data: Bets[]
}

// Global state

export interface State {
  farms: FarmsState
  pools: PoolsState
  bets: BetsState
}
