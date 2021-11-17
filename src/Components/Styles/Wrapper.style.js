import React from 'react'
import styled from 'styled-components'
import {GlobalStyles} from './GlobalStyles'

const WrapperStyle = styled.div ` 
    display: flex;
    flex-direction: column;
    background-color: #F2F2F2;
    min-height: 100vh;

    @media screen and (min-width: 1024px) {
        flex-direction: row;
    }
`

function Wrapper({children}) {
    return (
        <WrapperStyle>
            <GlobalStyles />
            {children}
        </WrapperStyle>
        
    )
}

export default Wrapper
