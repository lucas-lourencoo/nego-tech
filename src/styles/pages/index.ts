import styled from 'styled-components';

export const Container = styled.main`
  min-height: calc(100vh - 12rem);
  max-width: 1220px;
  margin: 0 auto;
  display: grid;
  align-items: center;
  justify-content: space-between;
  grid-template-columns: 1fr 1fr;

  .text {
    @keyframes appearText {
      from {
        transform: translateY(-1.6rem);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @keyframes appearTextLeft {
      from {
        transform: translateX(-1.6rem);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    display: flex;
    flex-direction: column;

    h1 {
      font: 700 7.8rem/1.1 'Nunito', sans-serif;
      margin-bottom: 1.6rem;
      letter-spacing: -1px;
      animation: appearText 1.5s forwards;
    }

    p {
      font-size: 1.8rem;
      color: var(--gray-500);
      margin-bottom: 3.2rem;
      line-height: 1.4;
      opacity: 0;
      animation: appearText 1s 0.5s forwards;
    }

    button {
      background: linear-gradient(93.21deg, #66ebf2 -2.2%, #aef9fd 102.5%);
      box-shadow: 0px 4px 25px -10px rgba(0, 0, 0, 0.5);
      border-radius: 16px;
      padding: 1.6rem 3.2rem;
      font-family: 'Nunito', sans-serif;
      color: var(--black);
      min-width: 20rem;
      font-size: 1.6rem;
      opacity: 0;
      animation: appearTextLeft 1s 1.3s forwards;
      transition: all 0.2s;

      :hover {
        filter: brightness(90%);
      }

      & + button {
        background: none;
        color: var(--white);
        border: 2px solid var(--principal-400);
        margin-left: 1.6rem;
        animation: appearTextLeft 1s 1.5s forwards;
      }
    }
  }
`;
