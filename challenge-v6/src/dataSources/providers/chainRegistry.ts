import { DataProviderType } from '../../types/types'
import { ChainRegistryClientOptions } from '@chain-registry/client'
import { AssetList } from '@chain-registry/types'


class ChainRegistryProvider implements DataProviderType {
    options: ChainRegistryClientOptions
    ChainRegistry: { assets: AssetList[] } = {
        assets: [],
    }

    constructor(options: ChainRegistryClientOptions) {
        this.options = options
    }

    async init() {
        //we only use assets here, keep tree shaking
        const { assets } = await import('chain-registry')
        const { chainNames } = this.options
        if (chainNames) {
            this.ChainRegistry.assets = assets.filter(({ chain_name }) => chainNames.includes(chain_name))
        }
    }

    getChainAssetList(chainName: string) {
        return this.ChainRegistry.assets.find(el => el.chain_name === chainName);
    }

}

export default ChainRegistryProvider