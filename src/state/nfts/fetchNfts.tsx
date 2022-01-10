import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import erc721 from 'config/abi/erc721.json'
import multicall from 'utils/multicall'
import nftTypes from 'config/constants/nftType'

const fetchNfts = async (account) => {
  const data = await Promise.all(
    nftTypes.map(async (nft) => {
      const address = nft.address
      const id = parseInt(nft.id)
      const calls = [{address: address, name: 'ownerOf', params: [id]}]

      let owned = false
      const [ownerNft] = await multicall(erc721, calls)

      if (ownerNft[0] === account) {
        owned = true
      }

      return {
        id: id,
        address: address,
        level: parseInt(nft.level),
        owned: owned,
      }
    }),
  )


  return data
}

export default fetchNfts
