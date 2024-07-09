
export const DEFAULT_CHAIN = 'osmosis'


//header displaying fields
import {AssetHeaderConfig} from './types/types'

export const ASSET_HEADER_CONFIG: AssetHeaderConfig = {
    Asset: {
        id: 1,
        displayKey: 'symbol',
        subDisplayKey: 'name',
    },
    Balance: {
        id: 2,
        displayKey: 'tokenAmount',
        subDisplayKey: 'tokenAmountPrice',
    },
    //other fields...
}