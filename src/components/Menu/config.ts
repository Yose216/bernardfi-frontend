import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Stake',
    icon: 'FarmIcon',
    items: [
      {
        label: 'Farms',
        href: '/farms',
      },
      {
        label: 'Pools',
        href: '/nests',
      },
    ],
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://pancakeswap.finance/swap',
      },
      {
        label: 'Liquidity',
        href: 'https://pancakeswap.finance/liquidity',
      },
    ],
  },
  {
    label: 'Play',
    icon: 'TicketIcon',
    items: [
      {
        label: 'Lottery',
        href: '/lottery',
      },
      {
        label: 'Bets',
        href: '/bets',
      },
      {
        label: 'BFC',
        href: '/bfc',
      },
    ],
  },
  {
    label: 'NFT Marketplace',
    icon: 'NftIcon',
    href: '/marketplace-nft',
  },
  {
    label: 'Ecosystem',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Infos',
        href: '/infos',
      },
      {
        label: 'Algo Perfs',
        href: '/algo',
      },
      {
        label: 'Barry Foundation',
        href: '/barry-foundation',
      },
    ],
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Docs',
        href: 'https://bernard-finance.gitbook.io/bernardswap/',
      },
      {
        label: 'Blog',
        href: 'https://bernardfinance.medium.com/',
      },
    ],
  },

]

export default config
