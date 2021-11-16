import React from 'react'
import styled from 'styled-components'
import Logo from '../assets/logo.svg'
import Moon from '../assets/icon-moon.svg'
import Avatar from '../assets/image-avatar.jpg'

const HeaderStyle = styled.header ` 
    background-color: #373B53;
    /* padding: 27px 0; */
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    @media screen and (min-width: 1024px) {
        flex: 0 0 103px;
        height: auto;
    }
`
const HeaderLogo = styled.div ` 
    height: 100%;
    width: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #7C5DFA;
    border-radius: 0 20px 20px 0;
    position: relative;
    cursor: pointer;

    &::after {
        content: '';
        position: absolute;
        height: 50%;
        bottom: 0;
        right: 0;
        width: 100%;
        border-radius: 20px 0 20px 0;
        background-color: #9277FF;
    }

    &::before {
        content: url(${Logo});
        z-index: 1;
    }
`
const HeaderIcons = styled.div ` 
    gap: 20px;
    display: flex;
    align-items: center;
`
const Icon = styled.button ` 
    background-image: url(${Moon});
    background-color: transparent;
    width: 20px;
    height: 20px;
    position: relative;

     &::after {
        content: '';
        position: absolute;
        right: -24px;
        top: -26px;
        width: 1px;
        background-color: #494E6E;
        height: 72px;
    }
`
const AvatarImg = styled.img ` 
    content: url(${Avatar});
    border-radius: 50%;
    width: 32px;
    height: 32px;
    margin: 0 24px;
`

export default function Header() {
    return (
        <HeaderStyle>
            <HeaderLogo />
            <HeaderIcons>
                <Icon />
                <AvatarImg />
            </HeaderIcons>
        </HeaderStyle>
    )
}
