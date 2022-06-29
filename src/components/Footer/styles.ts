import styled from 'styled-components';

export const Container = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  margin: 0 auto;

  max-width: 100%;

  border-top: 2px solid rgba(50, 50, 50, 0.7);

  img {
    max-width: 6rem;
    margin-bottom: 1rem;
  }

  cite {
    font-weight: 400;
    font-style: normal;
    color: var(--gray-600);
    font-family: 'Roboto', sans-serif;
    font-size: 0.8rem;
  }
`;
