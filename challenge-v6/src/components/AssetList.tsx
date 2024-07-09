import { memo, useCallback, useContext, useState } from 'react'
import styled, { css } from 'styled-components'
import { flexCenterCss, Button } from '../styles/commonStyles'
import Modal from './common/Modal'
import Combobox from './Combobox'
import DepositModal from './DepositModal'

import { observer } from 'mobx-react-lite';
import { AssetListContext } from '../store/assetListStore'

import { UserAssetInfo } from '../types/types'

import { ASSET_HEADER_CONFIG } from '../contants'

const itemBox = css`
    width: 200px;
    height: 100%;
    margin: 0 10px;
`

const AssetListPanel = styled.div`
    width:100vw ;
    max-width: 1080px;
    min-width:680px;
    min-height: 650px;
    padding: 60px 40px;
    border: 1px solid #e0dfdf;
    position: relative;
    box-sizing: border-box;
`

const AssetListHeader = styled.div`
    width:100% ;
    height: 50px;
    display: flex;
    align-items: center;
`
const AssetListContent = styled.div`
    width: 100%;
    >div{
        height: 60px;
        width: 100%;
    }
`

const AssetListBottom = styled.div`
    width: 100%;
    position: absolute;
    bottom: 40px;
`


//Header components
const HeaderItem = styled.div`
    ${itemBox}
    text-align: left;
`
const HeaderImg = styled.div`
    ${itemBox}  
    ${flexCenterCss}
    width:100px;
    >img{
        height: 75%;
    }
`
const HeaderOperation = styled.div`
    ${itemBox}
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-width: 200px;
    margin-left: auto;
`

//content components
const RowButton = styled(Button)`
    height: 35px;
    margin: 0 5px;
`

const TableRow = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    >div:not(:last-child,${HeaderImg}){
        ${itemBox}
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`

interface ContentRowProps {
    rowData: UserAssetInfo,
    displayKeys: string[],
    handleDeposit: (rowData: UserAssetInfo) => void,
    handleWithDraw: (rowData: UserAssetInfo) => void,
}

const ContentRow = memo(({ rowData, displayKeys, handleDeposit, handleWithDraw }: ContentRowProps) => {

    const rowItems = displayKeys.map(key => {
        if (!(key in ASSET_HEADER_CONFIG)) return null
        const target = ASSET_HEADER_CONFIG[key]
        return <div key={target.id}>
            <div style={{ textAlign: 'left' }}>{rowData[target.displayKey]}</div>
            <div style={{ textAlign: 'left', color: '#969292' }}>{rowData[target.subDisplayKey]}</div>
        </div>
    })

    return <TableRow>
        <HeaderImg><img src={rowData.imgSrc} /></HeaderImg>
        {rowItems}
        <HeaderOperation>
            <RowButton onClick={() => handleDeposit(rowData)}>Deposit</RowButton>
            <RowButton onClick={() => handleWithDraw(rowData)}>Withdraw</RowButton>
        </HeaderOperation>
    </TableRow>
}
)

interface AssetListProps {
    titles: string[],
}

const AssetList: React.FC<AssetListProps> = observer(({ titles }) => {
    const assetListStore = useContext(AssetListContext)
    if (!assetListStore) {
        throw new Error("AssetListStoreContext must be provided.");
    }

    const [isShowAddModal, setIsShowAddModal] = useState(false)
    const [isShowDepositModal, setIsShowDepositModal] = useState(false)
    const [selectedAsset, setSelectedAsset] = useState<string>('')
    const [depositAsset, setDepositAsset] = useState<UserAssetInfo>()

    const openAddModal = (isShow: boolean) => {
        setIsShowAddModal(isShow)
        if (!isShow) setSelectedAsset('')
    }
    const openDepositModal = (isShow: boolean, rowData?: UserAssetInfo) => {
        setIsShowDepositModal(isShow)
        isShow && setDepositAsset(rowData)
    }


    const handleDeposit = useCallback((rowData: UserAssetInfo) => {
        openDepositModal(true, rowData)
        //do something
    }, [])

    const handleWithDraw = useCallback((rowData: UserAssetInfo) => {
        console.log(rowData)
        //do something
    }, [])

    const headerItems = titles.map((el, index) => <HeaderItem key={index}>{el}</HeaderItem>)

    const contentRows = assetListStore.assetList.map((data, index) => {
        return <ContentRow rowData={data} displayKeys={titles} key={index}
            handleDeposit={handleDeposit}
            handleWithDraw={handleWithDraw}
        />
    })

    const defaultOptions = assetListStore.assetSource

    const handleSubmit = () => {
        if (selectedAsset) {
            assetListStore.addUserAsset(selectedAsset)
        }
        openAddModal(false)
    }

    const handleChange = (value: string) => {
        setSelectedAsset(value)
    }

    const addModalFooter = <Button onClick={handleSubmit}>submit</Button>

    return <AssetListPanel>
        <AssetListHeader>
            <HeaderImg />
            {headerItems}
            <HeaderOperation />
        </AssetListHeader>
        <AssetListContent>
            {contentRows}
        </AssetListContent>
        <AssetListBottom>
            <Button onClick={() => openAddModal(true)}>Add Asset</Button>
        </AssetListBottom>
        <Modal show={isShowAddModal} onClose={() => openAddModal(false)} title='add asset' footer={addModalFooter}>
            <Combobox label="Favorite Animal" value={selectedAsset} onChange={handleChange} styleProps={{ width: "350px" }}>
                {defaultOptions.length && defaultOptions.map(option => <Combobox.Item key={option.base}>{option.name}</Combobox.Item>)}
            </Combobox>
        </Modal>

        <DepositModal show={isShowDepositModal} onClose={useCallback(() => openDepositModal(false), [])}
            amount=""
            available={25.89}
            fromAddress="umee1lqsq...pv4axdaxk"
            fromImgSrc={depositAsset?.imgSrc ?? ''}
            fromName={depositAsset?.name ?? ''}
            fromSymbol={depositAsset?.symbol ?? ''}
            priceDisplayAmount={0.5}
            timeEstimateLabel="20 seconds"
            toAddress="osmo1lqsq...pv48trj5k"
            toImgSrc="https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg"
            toName="Osmosis" />
    </AssetListPanel>
}
)

export default AssetList