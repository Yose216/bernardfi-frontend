import BigNumber from 'bignumber.js'
import axios from 'axios'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import erc20 from 'config/abi/erc20.json'
import betsABI from 'config/abi/bets.json'
import multicall from 'utils/multicall'
import { getBetsAddress } from 'utils/addressHelpers'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

const fetchBets = async (account) => {

  let process = true;
  let id = 2;
  const data = [];
  while (process) {

    const calls = [
      // Bets
      {
        address: getBetsAddress(),
        name: 'rounds',
        params: [id],
      }
    ]

    if (account) {
      calls.push({address: getBetsAddress(),name: 'ledger',params: [id, account]})
      calls.push({address: getBetsAddress(),name: 'claimable',params: [id, account]})
    }
    const [ bet, ledger, claimable] = await multicall(betsABI, calls)
    const epoch = parseInt(bet.epoch.toString())
    if (epoch < 1) {
      process = false

    } else {
      const endTs = bet.endEpoch.toString();
      const type = "sport"
      let finish = false;
      if (Math.floor(Date.now() / 1000) > parseInt(endTs)) {
        finish = true;
      }

      const b:any = {
        id: epoch,
        homeBones: bet.homeAmount.toString(),
        drawBones: bet.drawAmount.toString(),
        awayBones: bet.awayAmount.toString(),
        finished: finish
      }

      let dataJson: any = {};
      const url = `https://ipfs.io/ipfs/${bet.ipfsurl}`
      try {
        const res = await axios.get(url);
        dataJson = res.data
        if (dataJson) {
          b.name = dataJson.name;
          b.home = dataJson.home;
          b.away = dataJson.away;
          b.type = dataJson.type;
          b.startDate = dataJson.date;
        }

      } catch (Error) {
        console.log('error')
      }

      if (ledger && ledger.amount.toString()) {
        b.amountBet = parseFloat(ledger.amount.toString())
        b.sideBet = ledger.position
        b.claimed = ledger.claimed
      }

      if (claimable) {
        if (claimable[0] && b.amountBet > 0) {
          b.claimable = true;
        } else {
          b.claimable = false;
        }

      }


      data.push(b);

      id++;
    }

  }

  return data
}

export default fetchBets
