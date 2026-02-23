import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    text-rendering: optimizeLegibility;
  }

  html {
    scroll-behavior: smooth;

    @media (max-width: 1080px) {
      font-size: 93.75%;
    }
    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    position: relative;
    font-family: var(--font-inter);
    font-weight: 400;
    font-size: 1.125rem;
    background: var(--black);
    color: var(--white);
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 8px;
      background: transparent;
    }

    &::-webkit-scrollbar-track {
      background: rgba(255,255,255,0.03);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 99px;
      background: linear-gradient(180deg, var(--accent-primary), var(--accent-secondary));
    }
  }

  ::selection {
    background: var(--accent-primary);
    color: var(--white);
  }

  :root {
    --black: #0a0a0f;
    --black-light: #12121a;
    --black-card: #16161f;
    --white: #f0f0f5;
    --white-muted: #a0a0b0;

    --accent-primary: #7c3aed;
    --accent-primary-light: #a78bfa;
    --accent-secondary: #06d6a0;
    --accent-secondary-light: #34efc3;
    --accent-cyan: #22d3ee;
    --accent-pink: #ec4899;

    --accent-gradient: linear-gradient(135deg, #7c3aed, #06d6a0);
    --accent-gradient-vivid: linear-gradient(135deg, #a78bfa, #22d3ee, #06d6a0);
    --accent-gradient-warm: linear-gradient(135deg, #ec4899, #7c3aed, #22d3ee);

    --glass-bg: rgba(22, 22, 31, 0.6);
    --glass-border: rgba(255, 255, 255, 0.08);
    --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

    --radius-sm: 8px;
    --radius-md: 16px;
    --radius-lg: 24px;
    --radius-xl: 32px;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }

  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  @keyframes glow {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  button, input, textarea, select {
    border: 0;
    background: none;
    font-family: inherit;
  }
  
  button {
    cursor: pointer;
  }

  img { 
    max-width: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, li {
    list-style: none;
  }
`;
