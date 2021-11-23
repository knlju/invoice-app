import React from 'react'
import { useState, useEffect } from 'react'
import styled, { ThemeProvider  } from 'styled-components'
// import styled from 'styled-components'
import Logo from '../assets/logo.svg'
import Avatar from '../assets/image-avatar.jpg'
import { light, dark } from '../Components/Styles/Themes'
import ThemeToggle from '../Components/ThemeToggle'

const HeaderStyle = styled.header ` 
    background-color: #373B53;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    @media screen and (min-width: 1024px) {
        flex: 0 0 103px;
        height: auto;
        flex-direction: column;
        border-radius: 0 20px 20px 0;
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
    @media screen and (min-width: 1024px) {
        height: 103px;
        width: 100%;
    }

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
    gap: 30px;
    display: flex;
    align-items: center;
    @media screen and (min-width: 1024px) {
        flex-direction: column;
    }
`
// const ButtonIcon = styled.button ` 
//     border: none;
//     outline: none;
//     background: transparent;
//     cursor: pointer;
//     outline: none;
//     position: relative;
    
//      &::after {
//         content: '';
//         position: absolute;
//         right: -24px;
//         top: -26px;
//         width: 1px;
//         background-color: #494E6E;
//         height: 72px;
//         @media screen and (min-width: 1024px) {
//             right: 10px;
//             top: 0;
//             transform: rotate(90deg);
//             height: 103px;
//         }
//     }
// `
const AvatarImg = styled.img ` 
    content: url(${Avatar});
    border-radius: 50%;
    width: 32px;
    height: 32px;
    margin: 0 24px;
    @media screen and (min-width: 1024px) {
        height: 40px;
        width: 40px;
        margin: 24px 0;
    }
`


export default function Header({toggleTheme}) {

    // const [theme, setTheme] = useState('light')

	// useEffect(() => {
	// 	if (localStorage.getItem('theme') === undefined) {
	// 		localStorage.setItem('theme', 'light')
	// 	}
	// 	setTheme(localStorage.getItem('theme'))
	// }, [setTheme])

    // function toggleTheme() {
	// 	localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light')
    //     setTheme(localStorage.getItem('theme'))
    // }

    return (
        
        <HeaderStyle>
            <HeaderLogo />
            <HeaderIcons>
                <ThemeToggle toggleTheme={toggleTheme} />
                <AvatarImg />
            </HeaderIcons>
        </HeaderStyle>
    )
}
