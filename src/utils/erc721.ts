import Web3 from 'web3'
import { provider as ProviderType } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import erc721 from 'config/abi/erc721.json'

export const getContract = (provider: ProviderType, address: string) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract((erc721 as unknown) as AbiItem, address)
  return contract
}

export const getOwnerNft = async (
  provider: ProviderType,
  nftAddress: string,
  userAddress: string,
  nftId: number,
): Promise<string> => {
  const contract = getContract(provider, nftAddress)
  try {
    const owner: string = await contract.methods.ownerOf(nftId).call()
    return owner
  } catch (e) {
    return '0'
  }
}
