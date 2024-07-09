import './App.css'
import AssetList from './components/AssetList'
import AssetListStore, { AssetListContext } from './store/assetListStore'

import sourceAdapter from './dataSources/sourceAdapter'
import { DEFAULT_CHAIN } from './contants'

import { Buffer } from 'buffer';
if (window && !window.Buffer) {
  window.Buffer = Buffer;
}

//for demonstration
const listDemo = [
  {
    chainName: 'osmosis',
    imgSrc: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/polygon/images/matic-purple.png',
    isOtherChains: false,
    name: 'Polygon',
    onDeposit: function Va() { },
    onWithdraw: function Va() { },
    symbol: 'MATIC',
    tokenAmount: '89.66',
    tokenAmountPrice: '10'
  },
  {
    chainName: 'osmosis',
    imgSrc: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/wbtc.axl.png',
    isOtherChains: false,
    name: 'Wrapped Bitcoin (Axelar)',
    onDeposit: function Va() { },
    onWithdraw: function Va() { },
    symbol: 'WBTC.axl',
    tokenAmount: '102.61',
    tokenAmountPrice: '101.02'
  }
]

const assetListStore = new AssetListStore(DEFAULT_CHAIN);
assetListStore.setUserAssetList(listDemo)

// get source type from .env
const dataSourceType = import.meta.env.VITE_DATA_SOURCE_TYPE;
const options = {
  chainNames: [
    'osmosis',
    'juno',
    'stargaze'
  ]
}
const sourceData = sourceAdapter(dataSourceType, options)
sourceData.init().then(() => {
  const defaultAssets = sourceData.getChainAssetList(DEFAULT_CHAIN)
  if (defaultAssets) {
    assetListStore.setAssetSource(defaultAssets)
  }
})


function App() {

  const titles = [
    'Asset',
    'Balance'
  ]

  return (
    <AssetListContext.Provider value={assetListStore}>
      <AssetList titles={titles}></AssetList>
    </AssetListContext.Provider>
  )
}

export default App
