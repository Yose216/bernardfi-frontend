/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import fetchPrices from './fetchPrices'
import { PricesState, Prices } from '../types'

const initialState: PricesState = { data: [] }

export const pricesSlice = createSlice({
  name: 'Prices',
  initialState,
  reducers: {
    setPricePublicData: (state, action) => {
      const livePricesData: Prices[] = action.payload
      state.data = livePricesData
    },
  },
})

// Actions
export const { setPricePublicData } = pricesSlice.actions

// Thunks
export const fetchPricesPublicDataAsync = () => async (dispatch) => {
  const thunkPrices = await fetchPrices()
  dispatch(setPricePublicData(thunkPrices))
}

export default pricesSlice.reducer
