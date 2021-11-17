import React from 'react'
import styled from 'styled-components'
import ArrowLeft from '../assets/icon-arrow-left.svg'
import { Link } from 'react-router-dom'

/*
<div>
    <Link to="/">
        {"<"} Go back
    </Link>
</div>
*/

export const GoBackLinkWrapper = styled.div`
    display: flex;
    font-weight: bold;
    font-size: 12px;
    line-height: 15px;
    /* identical to box height, or 125% */
    letter-spacing: -0.25px;
    color: #0C0E16;
    gap: 24px;

    img {
        height: 9px;
    }
`


const GoBackLink = () => {
    return (
        <Link to="/">
            <GoBackLinkWrapper>
                <img src={ArrowLeft} alt="arrow left" /> 
                <div>Go back</div>
            </GoBackLinkWrapper>
        </Link>
    )
}

export default GoBackLink

