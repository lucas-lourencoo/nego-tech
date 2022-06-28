import styled from 'styled-components';

export const Container = styled.section`
  min-height: calc(100vh - 7.5rem);
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  align-items: center;
  justify-content: space-between;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  position: relative;

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
      font: 700 4.5rem/1.1 'Nunito', sans-serif;
      margin-bottom: 1rem;
      letter-spacing: -1px;
      animation: appearText 1.5s forwards;

      span {
        font-weight: 900;
        letter-spacing: -5.8px;

        & + span {
          font-family: 'Roboto', sans-serif;
          font-weight: 100;
          letter-spacing: -4px;
          margin-left: -1.1rem;
        }
      }

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
      padding: 0.9rem 1.5rem;
      font-family: 'Nunito', sans-serif;
      color: var(--black);
      min-width: 10rem;
      font-size: 1rem;
      opacity: 0;
      animation: appearTextLeft 1s 1.3s forwards;
      transition: all 0.3s;
      font-weight: 600;

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
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(1.5rem);

    img {
      @keyframes UpDown {
        from {
          transform: translateY(1.5rem);
        }
        to {
          transform: translateY(0.5rem);
        }
      }

      animation: UpDown 4s alternate infinite;

      & + img {
        position: absolute;
        left: 50%;
        margin-left: -13rem;
        top: 50%;
        margin-top: -11rem;
        max-width: 21rem;
      }
    }
  }

  .goDown {
    @keyframes shineBrightLikeADiamont {
      0% {
        opacity: 0.5;
        transform: translateY(-0.5rem);
      }

      100% {
        opacity: 1;
      }
    }

    position: absolute;
    bottom: 0.5rem;

    img {
      max-width: 80%;
      animation: shineBrightLikeADiamont 1s forwards infinite alternate;
    }
  }
`;

export const About = styled.section`
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 1fr 1fr;
  max-width: 1120px;
  margin: 0 auto;
  gap: 2rem;
  padding: 2.5rem 0;

  .aboutMe {
    h2 {
      font: 700 1.25rem/1.1 'Nunito', sans-serif;
      text-transform: uppercase;
      color: var(--principal-500);
    }
    h3 {
      font: 500 3.4rem/1 'Nunito', sans-serif;
      color: var(--gray-300);
      margin-bottom: 2rem;
    }

    p {
      color: var(--gray-600);
      font-size: 1.1rem;
      margin-bottom: 1rem;
      font-weight: 400;
      font-family: 'Roboto', sans-serif;
    }

    ul {
      margin-top: 1.5rem;
      display: inline-block;

      li {
        display: flex;
        align-items: center;
        margin-bottom: 1.3rem;

        img {
          margin-right: 0.5rem;
        }

        span {
          display: inline-block;
          color: var(--white);
          font-size: 1rem;
        }
      }
    }
  }

  .images {
    width: 100%;
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    max-height: 680px;

    @keyframes moveImages {
      0% {
        transform: translateY(-10rem);
      }
      30% {
        transform: translateY(-2rem);
      }
      60% {
        transform: translateY(-19rem);
      }
      100% {
        transform: translateY(-10rem);
      }
    }

    @keyframes moveImages2 {
      0% {
        transform: translateY(-10rem);
      }
      50% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-10rem);
      }
    }

    ::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: radial-gradient(500% 47%, transparent 50%, var(--black) 100%);
      z-index: 1;
    }

    .left {
      animation: moveImages 15s infinite ease-in-out;
    }

    .right {
      animation: moveImages2 18s infinite;
    }

    img {
      border-radius: 10px;
      z-index: 0;
      max-width: 100%;
      margin-bottom: 0.25rem;
      filter: grayscale(80%);
    }
  }
`;
