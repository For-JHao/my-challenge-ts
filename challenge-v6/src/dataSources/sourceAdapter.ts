import ChainRegistryProvider from './providers/chainRegistry'
import ChainRegistryClientProvider from './providers/chainRegistryClient'

import { ChainRegistryClientOptions } from '@chain-registry/client'

export default function createSourceAdapter(dataSourceType: string, options: ChainRegistryClientOptions) {
    switch (dataSourceType) {
        case 'chain-registry':
            return new ChainRegistryProvider(options);
        case '@chain-registry/client':
            return new ChainRegistryClientProvider(options);
        default:
            throw new Error(`Unsupported data source type: ${dataSourceType}`);
    }
}