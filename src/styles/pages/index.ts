import styled from 'styled-components';

export const Container = styled.main`
  min-height: calc(100vh - 7.5rem);
  max-width: 1220px;
  margin: 0 auto;
  display: grid;
  align-items: center;
  justify-content: space-between;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 1120px) {
    grid-template-columns: none;
    max-width: 90%;
    gap: 4rem;
  }

  .text {
    @keyframes appearText {
      from {
        transform: translateY(-1rem);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @keyframes appearTextLeft {
      from {
        transform: translateX(-1rem);
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
      font: 700 5rem/1.1 'Nunito', sans-serif;
      margin-bottom: 1rem;
      letter-spacing: -1px;
      animation: appearText 1.5s forwards;

      @media (max-width: 1120px) {
        font-size: 3.5rem;
      }
    }

    p {
      font-size: 1rem;
      color: var(--gray-500);
      margin-bottom: 2rem;
      line-height: 1.4;
      opacity: 0;
      animation: appearText 1s 0.5s forwards;
    }

    button {
      background: linear-gradient(93.21deg, #66ebf2 -2.2%, #aef9fd 102.5%);
      box-shadow: 0px 4px 25px -10px rgba(0, 0, 0, 0.5);
      border-radius: 16px;
      padding: 1rem 2rem;
      font-family: 'Nunito', sans-serif;
      color: var(--black);
      min-width: 10rem;
      font-size: 1rem;
      opacity: 0;
      animation: appearTextLeft 1s 1.3s forwards;
      transition: all 0.3s;

      :hover {
        filter: brightness(90%);
      }

      & + button {
        background: none;
        color: var(--white);
        border: 2px solid var(--principal-400);
        margin-left: 1rem;
        animation: appearTextLeft 1s 1.5s forwards;

        :hover {
          filter: brightness(90%);
        }
      }
    }
  }

  .image {
    position: relative;

    img {
      max-width: 90%;

      @keyframes UpDown {
        from {
          transform: translateY(0.2rem);
        }
        to {
          transform: translateY(-0.2rem);
        }
      }

      animation: UpDown 5s alternate infinite;

      & + img {
        position: absolute;
        left: 50%;
        margin-left: -15rem;
        top: 50%;
        margin-top: -12rem;
        max-width: 22rem;
      }
    }
  }
`;
