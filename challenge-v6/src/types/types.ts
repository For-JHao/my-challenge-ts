export interface UserAssetInfo {
    chainName: string;
    imgSrc: string;
    isOtherChains: boolean;
    name: string;
    symbol: string;
    tokenAmount: string | number;
    tokenAmountPrice: string | number;
}

//header displaying fields
export interface AassetHeaderItem<T extends keyof UserAssetInfo, K extends keyof UserAssetInfo> {
    id: number;
    displayKey: T;
    subDisplayKey: K;
}
export interface AssetHeaderConfig {
    [key: string]: AassetHeaderItem<keyof UserAssetInfo, keyof UserAssetInfo>;
}


import { AssetList, Chain, IBCInfo } from '@chain-registry/types'
import { ChainRegistryClientOptions, ChainRegistryClient } from '@chain-registry/client'

export interface DataProviderType {
    client?: ChainRegistryClient;
    options: ChainRegistryClientOptions;
    init(): Promise<void>;
    getChainAssetList(chainName: string): AssetList | undefined;
    getChain?(chainName: string): Chain | undefined;
    getChainIbcData?(chainName: string): IBCInfo[] | undefined;
    getGeneratedAssetLists?(chainName: string): AssetList[] | undefined;
}