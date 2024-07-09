import React, { useEffect, useState, useRef, CSSProperties } from "react"
import styled from "styled-components"
import { inputRadiusCss } from '../styles/commonStyles'

const SelectContainer = styled.div`
    width: 300px;
    height: 80px;

`
const SelectLabel = styled.div`
    font-size: 0.8em;
    text-align: left;
    margin: 5px 0;
`

const SelectBox = styled.div`
    ${inputRadiusCss}
    box-sizing: border-box;
    border: 1.5px solid #d9d6d6;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

`
const SelectInput = styled.input`
    box-sizing: border-box;
    height: 90%;
    width: calc(100% - 20px);
    border: 0;
    margin-left: 6px;
    &:focus{
        outline: none;
    }
`
interface ArrowType {
    $isOpen: boolean;
}
const Arrow = styled.span<ArrowType>`
    margin: 5px;
    margin-right: 10px;
    display: inline-block;
    transform: ${props => (props.$isOpen ? 'rotate(270deg)' : 'rotate(90deg)')} scale(1, 1.5);
    transition: transform 0.2s;
    color: #bcb7b7;
`;

const SelectList = styled.ul`
    box-sizing: border-box; 
    margin-top: 0;
    width: 100%;
    border: 1px solid #dad9d9;
    background-color: white;
    position: relative;
    z-index: 1002;
    max-height:200px;
    overflow: auto;
`

interface ComboboxType {
    label: string;
    value: string;
    openOnFocus?: boolean;
    styleProps?: CSSProperties;
    children?: React.ReactNode;
    onChange: (value: string) => void;
}
interface ComboboxItemType {
    children?: React.ReactNode;
}

const Combobox: React.FC<ComboboxType> & { Item: React.FC<ComboboxItemType> } = ({ label, value, openOnFocus, styleProps, children, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const toggleDropdown = (open: boolean) => {
        setIsOpen(open);
    };

    useEffect(() => {
        if (openOnFocus) {
            inputRef.current?.focus();
        }
    }, [openOnFocus])

    const handleItemClick = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target instanceof HTMLElement) {
            const item = e.target.closest('li');
            item && onChange(item.innerText)
        }
        setIsOpen(false);
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
        setIsOpen(true);
    };

    return (
        <SelectContainer style={styleProps}>
            <SelectLabel>{label}</SelectLabel>
            <SelectBox>
                <SelectInput
                    ref={inputRef}
                    value={value}
                    onChange={handleInputChange}
                    onFocus={() => toggleDropdown(true)}
                    onBlur={() => toggleDropdown(false)}
                >
                </SelectInput>
                <Arrow $isOpen={isOpen}>&gt;</Arrow>
            </SelectBox>
            {(isOpen && children) ? <SelectList onMouseDown={handleItemClick}> {children}</SelectList> : null}
        </SelectContainer>
    )
}

const ComboxItem = styled.li`
    padding: 8px;
    cursor: pointer;
    &:hover {
    background-color: #f0f0f0;
    }
`
const ComboboxItem: React.FC<ComboboxItemType> = ({ children }) => {
    return (
        <ComboxItem>
            {children}
        </ComboxItem>
    )
};
Combobox.Item = ComboboxItem



export default Combobox