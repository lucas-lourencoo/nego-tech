import styled from "styled-components";

export const Container = styled.header`
  font-family: var(--font-space);
  font-weight: 500;
  position: sticky;
  width: 100%;
  top: 0;
  z-index: 1000;

  background: rgba(10, 10, 15, 0.7);
  border-bottom: 1px solid var(--glass-border);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  .center {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    height: 5rem;
    padding: 0 2rem;
  }

  .logo {
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
      height: 2.5rem;
      width: auto;
    }
  }

  .desktop-nav {
    @media (max-width: 768px) {
      display: none;
    }

    ul {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    li {
      position: relative;

      a,
      span {
        display: block;
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
        color: var(--white-muted);
        cursor: pointer;
        transition: color 0.3s ease;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        font-size: 0.8rem;

        &:hover {
          color: var(--white);
        }
      }

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        background: var(--accent-gradient);
        transition: all 0.3s ease;
        transform: translateX(-50%);
        border-radius: 2px;
      }

      &:hover::after {
        width: 60%;
      }

      &.cta {
        margin-left: 0.5rem;

        &::after {
          display: none;
        }

        a {
          background: var(--accent-gradient);
          color: var(--white);
          border-radius: var(--radius-md);
          padding: 0.6rem 1.5rem;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 25px rgba(124, 58, 237, 0.5);
          }
        }
      }
    }
  }

  /* Hamburger menu button */
  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    z-index: 1001;
    padding: 8px;
    background: none;

    @media (max-width: 768px) {
      display: flex;
    }

    span {
      display: block;
      width: 24px;
      height: 2px;
      background: var(--white);
      border-radius: 2px;
      transition: all 0.3s ease;
    }

    &.active {
      span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      span:nth-child(2) {
        opacity: 0;
      }
      span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
      }
    }
  }

  /* Mobile nav */
  .mobile-nav {
    display: none;

    @media (max-width: 768px) {
      display: block;
      position: absolute;
      top: 5rem;
      left: 0;
      width: 100%;
      background: rgba(10, 10, 15, 0.95);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--glass-border);
      padding: 1.5rem 2rem;
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    li a {
      display: block;
      padding: 0.8rem 0;
      font-size: 1rem;
      color: var(--white-muted);
      cursor: pointer;
      transition: color 0.3s ease;
      border-bottom: 1px solid var(--glass-border);

      &:hover {
        color: var(--accent-primary-light);
      }
    }

    li:last-child a {
      border-bottom: none;
      color: var(--accent-secondary);
      font-weight: 600;
    }
  }
`;
