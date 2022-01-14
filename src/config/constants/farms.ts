import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 7,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'Classic BERN',
    lpAddresses: {
      97: '',
      56: '0x274bbFf5Fa1b37610a9068823266ae7649fEB30c', // BERN-BNB LP
    },
    tokenSymbol: 'BERN',
    tokenAddresses: {
      97: '',
      56: '0x27d0408a868cf4e89b37d20b5e32888dced95bcb',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    level: 1
  },
  {
    pid: 1,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'Classic BARREL',
    lpAddresses: {
      97: '',
      56: '0x8f403146205785D7CA50309c9CD559dfc58103a6', // BARREL-BUSD LP
    },
    tokenSymbol: 'BARREL',
    tokenAddresses: {
      97: '',
      56: '0xDB1B7a685e6876d508DE3c5160764B56577a83ae',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    level: 1
  },
  {
    pid: 8,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'Bronze BERN',
    lpAddresses: {
      97: '',
      56: '0x274bbff5fa1b37610a9068823266ae7649feb30c', // BERN-BNB LP
    },
    tokenSymbol: 'BERN',
    tokenAddresses: {
      97: '',
      56: '0x27d0408a868cf4e89b37d20b5e32888dced95bcb',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    level: 2
  },
  {
    pid: 2,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'Bronze BARREL',
    lpAddresses: {
      97: '',
      56: '0x8f403146205785D7CA50309c9CD559dfc58103a6', // BARREL-BUSD LP
    },
    tokenSymbol: 'BARREL',
    tokenAddresses: {
      97: '',
      56: '0xDB1B7a685e6876d508DE3c5160764B56577a83ae',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    level: 2
  },
  {
    pid: 9,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'Super BERN',
    lpAddresses: {
      97: '',
      56: '0x274bbFf5Fa1b37610a9068823266ae7649fEB30c', // BERN-BNB LP
    },
    tokenSymbol: 'BERN',
    tokenAddresses: {
      97: '',
      56: '0x27d0408a868cf4e89b37d20b5e32888dced95bcb',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    level: 3
  },
  {
    pid: 3,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'Super BARREL',
    lpAddresses: {
      97: '',
      56: '0x8f403146205785D7CA50309c9CD559dfc58103a6', // BARREL-BUSD LP
    },
    tokenSymbol: 'BARREL',
    tokenAddresses: {
      97: '',
      56: '0xDB1B7a685e6876d508DE3c5160764B56577a83ae',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    level: 3
  },

  {
    pid: 0,
    risk: 5,
    lpSymbol: 'BONES-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x16D1e6fE08E77713989f6A7c1E01Db0494CaA6d1',
    },
    tokenSymbol: 'BONES',
    tokenAddresses: {
      97: '',
      56: '0x612b5c1a2d7e94d03dddd53d459d4b944903497d',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    level: 0,
  },
]

export default farms
