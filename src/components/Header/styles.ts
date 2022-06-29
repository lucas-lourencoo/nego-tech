import styled from 'styled-components';

export const Container = styled.header`
  font-family: 'Nunito', sans-serif;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1120px;
  margin: 0 auto;
  width: 100%;
  height: 7rem;
  background: linear-gradient(180deg, var(--black) 25%, transparent 100%);
  position: sticky;
  top: 0;
  z-index: 1000;

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
`;
