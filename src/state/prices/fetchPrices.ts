import BigNumber from 'bignumber.js'

import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import lp from 'config/abi/bnbLp.json'
import multicall from 'utils/multicall'
import prices from 'config/constants/prices'

const fetchPrices = async () => {
  const data = await Promise.all(
    prices.map(async (price) => {
      const calls = [
        {address: price.bnb, name: 'getReserves', params: []},
        {address: price.barrel, name: 'getReserves', params: []},
        {address: price.bern, name: 'getReserves', params: []}
      ]

      let priceBnb = 0;
      let priceBarrel = 0;
      let priceBern = 0;
      try {

        const [bnb, barrel, bern] = await multicall(lp, calls)
        priceBnb = parseFloat(bnb[1]) / parseFloat(bnb[0])
        priceBarrel = parseFloat(barrel[1]) / parseFloat(barrel[0])
        const bernS = new BigNumber(parseFloat(bern[1]) / parseFloat(bern[0])).times(new BigNumber(priceBnb))
        priceBern = bernS.toNumber()

      } catch (e) {

        console.log(e)
      }


      return {
        barrelPrice: priceBarrel,
        bernPrice: priceBern,
        bnbPrice: priceBnb
      }
    }),
  )

  return data
}

export default fetchPrices
