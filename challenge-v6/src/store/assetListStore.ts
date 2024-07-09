import { makeAutoObservable, runInAction } from 'mobx';
import { createContext } from 'react';
import { DEFAULT_CHAIN } from '../contants'

import { UserAssetInfo } from '../types/types'
import { AssetList, Asset } from '@chain-registry/types'


export const AssetListContext = createContext<AssetListStoreType | null>(null)

interface AssetListStoreType {
  selectedChain: string;
  assetList: UserAssetInfo[];
  assetSource: Asset[];
  setUserAssetList(userAssets: UserAssetInfo[]): void;
  setAssetSource(data: AssetList): void;
  getAssetInfo(assetName: string): Asset;
  addUserAsset(assetName: string): Promise<void>;
  fetchUserAssetInfo(assetName: string): Promise<UserAssetInfo>;
}

class AssetListStore implements AssetListStoreType {

  selectedChain = '';
  assetList: UserAssetInfo[] = [];
  assetSource: Asset[] = [];

  constructor(chainName: string) {
    this.selectedChain = chainName || DEFAULT_CHAIN
    makeAutoObservable(this);
  }

  setUserAssetList(userAssets: UserAssetInfo[]): void {
    this.assetList = userAssets.filter(el => el.chainName === this.selectedChain)
  }

  setAssetSource(data: AssetList): void {
    if (this.selectedChain && data.chain_name !== this.selectedChain) {
      throw new Error(`the assets data source has to be: ${this.selectedChain}`);
    }
    this.assetSource = data.assets
  }

  getAssetInfo(assetName: string): Asset {
    const assetInfo = this.assetSource.find(el => el.name = assetName)
    if (!assetInfo) {
      throw new Error(`Asset not found: ${assetName}`);
    }
    return assetInfo;
  }


  async addUserAsset(assetName: string): Promise<void> {
    // get user the asset info
    const userAsset = await this.fetchUserAssetInfo(assetName)
    runInAction(() => {
      if (userAsset.chainName) {
        this.assetList.push(userAsset)
      } else {
        throw new Error(`No current data found, assetName: ${assetName}`)
      }
    })
  }

  //just for demonstrating
  async fetchUserAssetInfo(assetName: string): Promise<UserAssetInfo> {
    const assetInfo = this.assetSource.find(el => el.name === assetName)
    if (!assetInfo) throw new Error(`No current data in user account, assetName: ${assetName}`)
    return {
      chainName: this.selectedChain,
      imgSrc: assetInfo.logo_URIs?.png || assetInfo.logo_URIs?.svg || '',
      isOtherChains: false,
      name: assetInfo.name,
      symbol: assetInfo.symbol,
      tokenAmount: '102.61',
      tokenAmountPrice: '88'
    }

  }

}

export default AssetListStore;
