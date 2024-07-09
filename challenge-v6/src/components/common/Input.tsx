import styled from "styled-components";
import { globalColor } from "../../styles/commonStyles"
import { memo } from "react";

const InputContainer = styled.div`
    width:100%;
    height:100%;
`
const InputLabel = styled.div`
    color:${globalColor.font};
    margin:5px 0;
    height:20px;
    font-size:12px;
`

const InputBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e8eef4;
    height:calc(100% - 40px);
    min-height:40px;
    padding:5px;

    >img{
        height:calc(100% - 10px);
        margin:5px;
        width:30px;
    }

    >input{
        height:calc(100% - 10px);
        width:calc(100% - 40px);
        border:none;
        background-color: transparent;
        outline: none; 
    }
`

interface InputType {
    label: string;
    value: string;
    imgSrc?: string;
    readOnly?: boolean;
    onChange?: () => void;
}

const Input: React.FC<InputType> = ({ label, imgSrc, value, readOnly, onChange }) => {
    return (
        <InputContainer>
            <InputLabel>{label}</InputLabel>
            <InputBox>
                {imgSrc ? <img src={imgSrc}></img> : null}
                <input value={value} onChange={onChange} readOnly={readOnly} />
            </InputBox>
        </InputContainer>
    )
}

const MemoizedInput = memo(Input)

export default MemoizedInput