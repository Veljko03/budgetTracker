import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
        
    }

    body{
        font-size:clamp(1rem, 1.5v2,1.2rem);
        overflow: hidden;
    }
`;
