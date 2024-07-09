import styled, { createGlobalStyle } from 'styled-components'
import { Button, flexCenterCss, inputRadiusCss, globalColor } from '../styles/commonStyles'

import Modal from './common/Modal'
import Input from './common/Input'
import { memo, useEffect, useState } from 'react'

const LocalStyle = createGlobalStyle`
    *{
        color:${globalColor.font}
    }
`

const TransferButton = styled(Button)`
    width:100%;
    background-color:black;
    color:white;
`
const CancelButton = styled(Button)`
    width:100%;
    margin-top:5px;
`
const PathRow = styled.div`
    ${flexCenterCss}
    margin:10px 0;

    & > .pathSymbol {
        width:40px;
        margin:0 5px;
        transform: translate(2px, 50%);
    }
   
`
const PathRowInput = styled(Input)`
    width:calc(50% - 20px)
`

const AmountRow = styled.div`
    margin:20px 0;
    *{
        box-sizing: border-box;
    }
`
const AmountLabel = styled.div`
    display:flex;
    justify-content: space-between; 
    > .head{
        font-weight: 600;
    }
    > .tail{
        font-size:14px;
        color:grey;
    }
`

const AmountInput = styled.div`
    ${flexCenterCss}
    ${inputRadiusCss}
    border: 1px solid #ece5e5;
    margin:5px 0;
    > img{
        height:60px;
        width:60px;
        padding:8px;
        border-right:1px solid #ece5e5;
    }
    > .amountValue{
        width:100px;
        > P{
            font-size:14px;
            color:grey;
            display:inline;
        }
    }
    > input{
        border:none;
        background-color: transparent;
        outline: none; 
        width:calc(100% - 60px - 100px);
        font-size: medium;
        margin: 0 10px;
    }
`
const AmountFooter = styled.div`
    display:flex;
    justify-content:end;
    >button{
        background-color:${globalColor.input};
        margin-left:6px;
        height: 25px;
        padding: 5px;
        font-size: 12px;
    }
`

const Reminder = styled.div`
    background-color:${globalColor.input};
    margin:12px 0;
    display:flex;
    align-items: center;

    > img{
        width:20px;
        height:20px;
        margin:5px;
    }
`
interface DepositModalType {
    show: boolean;
    amount: string;
    fromName: string;
    fromImgSrc: string;
    fromAddress: string;
    priceDisplayAmount: number;
    timeEstimateLabel: string;
    toName: string;
    toImgSrc: string;
    toAddress: string;
    available: number;
    fromSymbol: string;
    onClose: () => void;
}

const DepositModal: React.FC<DepositModalType> = memo(({ show, fromName, fromImgSrc, fromAddress, toName, toImgSrc, toAddress, available, fromSymbol, timeEstimateLabel, onClose }) => {

    const [amount, setAmount] = useState(0)
    const [amountValue, setAmountValue] = useState(0)

    useEffect(() => {
        const price = 12 //for example 
        setAmountValue(amount * price)
    }, [amount])

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(event.target.value))
    }

    const depositModalFooter = (
        <>
            <TransferButton>Transfer</TransferButton>
            <CancelButton>Cancel</CancelButton>
        </>
    )

    return (
        <Modal show={show} onClose={onClose} title='Deposit ATOM' footer={depositModalFooter}>
            <LocalStyle />
            <PathRow>
                <PathRowInput label={`From ${fromName} Hub`} value={fromAddress} imgSrc={fromImgSrc} readOnly />
                <div className='pathSymbol'> -&gt;</div>
                <PathRowInput label={`To ${toName}`} value={toAddress} imgSrc={toImgSrc} readOnly />
            </PathRow>
            <AmountRow>
                <AmountLabel>
                    <div className='head'>Select amount</div>
                    <div className='tail'>Available {available} {fromSymbol}</div>
                </AmountLabel>
                <AmountInput>
                    <img src={fromImgSrc}></img>
                    <input value={amount} onChange={(value) => handleAmountChange(value)} type='number' />
                    <div className='amountValue'>{fromSymbol} <p>{amountValue ? '≈ $' + amountValue : ''}</p></div>
                </AmountInput>
                <AmountFooter>
                    <button>Max</button>
                    <button>1/2</button>
                    <button>1/3</button>
                </AmountFooter>
            </AmountRow>
            <Reminder>
                <img className='iconTimer' />
                <pre>Estimated time: {timeEstimateLabel} <b>seconds</b></pre>
            </Reminder>
        </Modal>
    )
}
)

export default DepositModal