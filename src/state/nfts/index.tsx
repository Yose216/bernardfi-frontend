/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import fetchNfts from './fetchNfts'
import { NftsState, Nfts } from '../types'

const initialState: NftsState = { data: [] }

export const nftsSlice = createSlice({
  name: 'Nfts',
  initialState,
  reducers: {
    setNftsPublicData: (state, action) => {
      const liveNftsData: Nfts[] = action.payload
      state.data = liveNftsData
    },
  },
})

// Actions
export const { setNftsPublicData } = nftsSlice.actions

// Thunks
export const fetchNftsPublicDataAsync = (account) => async (dispatch) => {
  const thunkNfts = await fetchNfts(account)
  dispatch(setNftsPublicData(thunkNfts))
}

export default nftsSlice.reducer
