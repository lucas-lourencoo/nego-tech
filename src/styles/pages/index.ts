import styled from 'styled-components';

export const Container = styled.main`
  min-height: calc(100vh - 9.2rem);
  max-width: 1220px;
  margin: 0 auto;
  display: grid;
  align-items: center;
  justify-content: space-between;
  grid-template-columns: 1fr 1fr;

  .text {
    display: flex;
    flex-direction: column;

    h1 {
      font: 700 7.8rem/1.1 'Nunito', sans-serif;
      margin-bottom: 1.6rem;
      letter-spacing: -1px;
    }

    p {
      font-size: 1.8rem;
      color: var(--gray-500);
      margin-bottom: 3.2rem;
    }

    button {
      background: linear-gradient(93.21deg, #66ebf2 -2.2%, #aef9fd 102.5%);
      box-shadow: 0px 4px 25px -10px rgba(0, 0, 0, 0.5);
      border-radius: 16px;
      padding: 1.6rem 3.2rem;
      font-family: 'Nunito', sans-serif;
      color: var(--black);
    }
  }

  img {
    transform: translateX(4rem);
  }
`;
