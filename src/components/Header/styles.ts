import styled from 'styled-components';

export const Container = styled.header`
  font-family: 'Nunito', sans-serif;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1220px;
  margin: 0 auto;
  width: 100%;
  height: 9.2rem;

  ul li {
    margin: 0 1.6rem;

    &:last-child {
      background: var(--complement-400);
      padding: 0.8rem 1.6rem;
      border-radius: 16px;
    }
  }
`;
