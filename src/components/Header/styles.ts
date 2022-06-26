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
  height: 7.5rem;

  @media (max-width: 1120px) {
    max-width: 90%;

    ul {
      display: none;
    }
  }

  ul li {
    margin: 0 1rem;

    &:last-child {
      background: var(--complement-400);
      padding: 0.7rem 1.5rem;
      border-radius: 16px;
      color: var(--black);
      font-weight: 700;
    }
  }
`;
