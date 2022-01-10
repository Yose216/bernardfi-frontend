import { configureStore } from '@reduxjs/toolkit'
import farmsReducer from './farms'
import poolsReducer from './pools'
import betsReducer from './bets'
import nftsReducer from './nfts'

export default configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    farms: farmsReducer,
    pools: poolsReducer,
    bets: betsReducer,
    nfts: nftsReducer,
  },
})
