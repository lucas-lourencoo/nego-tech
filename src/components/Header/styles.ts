import styled from "styled-components";

export const Container = styled.header`
  font-family: var(--font-nunito);
  font-weight: 400;

  position: sticky;
  width: 100%;
  top: 0;
  z-index: 1000;

  /* From https://css.glass */
  background: rgba(18, 18, 18, 0.65);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  .center {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1120px;
    margin: 0 auto;
    height: 7rem;

    @media (max-width: 720px) {
      max-width: 90%;
      justify-content: center;
      height: 6rem;

      img {
        height: 4rem;
      }

      ul {
        display: none;
      }
    }

    ul li {
      margin: 0 1rem;

      &:last-child {
        background: var(--complement-400);
        padding: 0.5rem 1.5rem;
        border-radius: 16px;
        color: var(--black);
        font-weight: 700;
      }
    }
  }
`;
