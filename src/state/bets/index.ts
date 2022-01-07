/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import fetchBets from './fetchBets'
import { BetsState, Bets } from '../types'

const initialState: BetsState = { data: [] }

export const betsSlice = createSlice({
  name: 'Bets',
  initialState,
  reducers: {
    setBetsPublicData: (state, action) => {
      const liveBetsData: Bets[] = action.payload
      state.data = liveBetsData
    },
  },
})

// Actions
export const { setBetsPublicData } = betsSlice.actions

// Thunks
export const fetchBetsPublicDataAsync = (account) => async (dispatch) => {
  const thunkBets = await fetchBets(account)
  dispatch(setBetsPublicData(thunkBets))
}

export default betsSlice.reducer
