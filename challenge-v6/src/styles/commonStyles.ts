import { css,styled } from 'styled-components'

export const flexCenterCss = css`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Button = styled.button`
    ${flexCenterCss}
    color: #4f5152;
`

export const inputRadiusCss=css`
    border-radius: 5px;
`

export const globalColor={
    input:'#e8eef4',
    font:'#6c6969'
}