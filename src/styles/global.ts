import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    text-rendering: optimizeLegibility;
  }

  body {
    position: relative;
    font-family: var(--font-roboto);
    font-weight: 400;
    font-size: 1.125rem;
    background: var(--black);
    color: var(--white);

    &::-webkit-scrollbar {
      width: 20px;
      background: transparent;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
     
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(60,60,60,0.7);
      border: 6px solid var(--black);
    }
  }

  html {
  @media (max-width: 1080px) {
    font-size: 93.75%;
  }
  @media (max-width: 720px) {
    font-size: 87.5%;
  }
}

  :root{
    --black: #121212;
    --white: #F8F7FC;
    --principal-200: #AEF9FD;
    --principal-300: #89F3F9;
    --principal-400: #66EBF2;
    --principal-500: #58D1D7;
    --principal-600: #4AB6BC;
    --complement-300: #FDCEAE;
    --complement-300: #F9B689;
    --complement-400: #F29E66;
    --complement-500: #B97649;
    --complement-600: #7E4E2E;
    --gray-300: #DDE1E1;
    --gray-400: #D8DCDC;
    --gray-500: #BEC2C2;
    --gray-600: #b3b5b5;
  }

  button, input, textarea, select{
    border: 0;
    background: none;
  }
  
  button {
    cursor: pointer;
  }

  img{ 
    max-width: 100%;
  }

  a{
    text-decoration: none;
    color: inherit;
  }

  ul, li{
    display: inline;
  }
`;
