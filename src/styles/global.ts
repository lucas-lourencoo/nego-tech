import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    text-rendering: optimizeLegibility;
  }

  body {
    position: relative;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 1.125rem;
    background: var(--black);
    color: var(--white);

    ::before{
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      background: url('/bg.png');
      mix-blend-mode: darken;
      z-index: -1;
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
    --black: #1C1C1E;
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
    --gray-600: #A4A7A7;
    --gray-600: #8A8D8D;
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
