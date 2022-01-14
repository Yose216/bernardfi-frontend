import React, { useContext, useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { usePriceCakeBusd, usePrices } from 'state/hooks'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import { Menu as UikitMenu } from '@pancakeswap-libs/uikit'
import config from './config'

const Menu = (props) => {
  const { account, connect, reset } = useWallet()
  const [barrelPrice, setBarrelPrice] = useState(0)
  const [bernPrice, setBernPrice] = useState(0)

  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = usePriceCakeBusd()
  const prices = usePrices()[0]
  useEffect(() => {
  const timer = setTimeout(() => {
    if (prices) {
      setBernPrice(prices.bernPrice)
      setBarrelPrice(prices.barrelPrice)
    }
  }, 1000);
  return () => clearTimeout(timer);
}, [prices]);

  return (
    <UikitMenu
      account={account}
      login={connect}
      logout={reset}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage && selectedLanguage.code}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      bernPriceUsd={bernPrice}
      barrelPriceUsd={barrelPrice}
      bonesPriceUsd={cakePriceUsd.toNumber()}
      links={config}
      bernPriceLink="https://www.defined.fi/bsc/0x27d0408a868cf4e89b37d20b5e32888dced95bcb"
      barrelPriceLink="https://www.defined.fi/bsc/0xdb1b7a685e6876d508de3c5160764b56577a83ae"
      bonesPriceLink="https://www.defined.fi/bsc/0x16d1e6fe08e77713989f6a7c1e01db0494caa6d1"
      {...props}
    />
  )
}

export default Menu
