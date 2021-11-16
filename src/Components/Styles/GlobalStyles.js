import {createGlobalStyle} from 'styled-components'

export const GlobalStyles = createGlobalStyle ` 
    @import url('https://fonts.googleapis.com/css2?family=Spartan:wght@300;400;500;700&display=swap');

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html {
        font-family: 'Spartan', sans-serif;
    }
    body {
        background-color: #f2f2f2;
        color: #0C0E16;
    }
    button {
        font-family: 'Spartan', sans-serif;
        outline: none;
        border: none;
        cursor: pointer;
    }
    img {
        max-width: 100%;
        display: block;
        object-fit: cover;
    }
    a {
        text-decoration: none;
    }
    ul {
        list-style: none;
    }
    h1 {
        font-weight: 700;
        font-size: 32px;
        line-height: 36px;
        letter-spacing: -1px;
    }
    h2 {
        font-weight: 700;
        font-size: 20px;
        line-height: 22px;
        letter-spacing: -0.625px;
    }
    h3 {
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.8px;
    }
    p {
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: -0.25px;
    }

`