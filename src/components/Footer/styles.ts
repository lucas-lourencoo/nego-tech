import styled from "styled-components";

export const Container = styled.footer`
  position: relative;
  padding: 3rem 0 2rem;
  margin: 0 auto;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    max-width: 600px;
    height: 1px;
    background: var(--accent-gradient);
    opacity: 0.3;
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .brand {
    text-align: center;

    h3 {
      font-family: var(--font-space);
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--white);

      span {
        color: var(--accent-primary);
      }
    }

    p {
      color: var(--white-muted);
      font-size: 0.9rem;
      margin-top: 0.3rem;
    }
  }

  .social {
    display: flex;
    align-items: center;
    gap: 1rem;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      color: var(--white-muted);
      transition: all 0.3s ease;

      &:hover {
        color: var(--accent-primary-light);
        border-color: var(--accent-primary);
        box-shadow: 0 0 20px rgba(124, 58, 237, 0.3);
      }
    }
  }

  cite {
    font-weight: 400;
    font-style: normal;
    color: var(--white-muted);
    font-family: var(--font-inter);
    font-size: 0.75rem;
    opacity: 0.6;
  }
`;
