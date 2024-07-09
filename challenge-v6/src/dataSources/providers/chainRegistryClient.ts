import { DataProviderType } from '../../types/types'
import { ChainRegistryClientOptions, ChainRegistryClient } from '@chain-registry/client'


class ChainRegistryClientProvider implements DataProviderType {
    client: ChainRegistryClient | undefined = undefined
    options: ChainRegistryClientOptions

    constructor(options: ChainRegistryClientOptions) {
        this.options = options
    }

    async init() {
        const { ChainRegistryClient } = await import('@chain-registry/client')
        this.client = new ChainRegistryClient(this.options);
        await this.client.fetchUrls();
    }

    getChainAssetList(chainName:string) {
        return this.client?.getChainAssetList(chainName);
    }

    getChain(chainName:string) {
        return this.client?.getChain(chainName);
    }
    getChainIbcData(chainName:string) {
        return this.client?.getChainIbcData(chainName);
    }
    getGeneratedAssetLists(chainName:string) {
        return this.client?.getGeneratedAssetLists(chainName);
    }

}

export default ChainRegistryClientProvider