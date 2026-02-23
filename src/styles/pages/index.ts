import { motion } from "framer-motion";
import styled from "styled-components";

/* =====================================
   HERO SECTION
======================================= */

/** Full-viewport wrapper — holds the ambient glow orbs */
export const HeroWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(100vh - 5rem);
  display: flex;
  align-items: center;
  overflow: hidden;

  /* Purple orb — top right */
  &::before {
    content: "";
    position: absolute;
    top: -10%;
    right: 0;
    width: 700px;
    height: 700px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(124, 58, 237, 0.18) 0%,
      transparent 65%
    );
    pointer-events: none;
    animation: float 8s ease-in-out infinite;
  }

  /* Green orb — bottom left */
  &::after {
    content: "";
    position: absolute;
    bottom: -10%;
    left: 0;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(6, 214, 160, 0.12) 0%,
      transparent 65%
    );
    pointer-events: none;
    animation: float 10s ease-in-out infinite reverse;
  }

  @media (max-width: 960px) {
    min-height: auto;
    padding: 4rem 0;
    flex-direction: column;
  }

  .social-bar {
    position: absolute;
    left: 2rem;
    bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 3;

    @media (max-width: 960px) {
      position: static;
      justify-content: center;
      margin-top: 1.5rem;
    }

    &::before {
      content: "";
      width: 40px;
      height: 1px;
      background: var(--glass-border);

      @media (max-width: 960px) {
        display: none;
      }
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 1px solid var(--glass-border);
      color: var(--white-muted);
      transition: all 0.3s ease;

      &:hover {
        color: var(--accent-primary-light);
        border-color: var(--accent-primary);
        transform: translateY(-3px);
        box-shadow: 0 0 15px rgba(124, 58, 237, 0.3);
      }
    }
  }
`;

/** Centered content grid — no overflow clipping */
export const Container = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  position: relative;

  @media (max-width: 960px) {
    flex-direction: column;
    text-align: center;
    padding: 2rem;
    gap: 3rem;
  }

  .text {
    flex: 1;
    position: relative;
    z-index: 2;
    max-width: 600px;

    @media (max-width: 960px) {
      max-width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.4rem 1rem;
      border-radius: 99px;
      background: rgba(124, 58, 237, 0.1);
      border: 1px solid rgba(124, 58, 237, 0.3);
      color: var(--accent-primary-light);
      font-size: 0.8rem;
      font-weight: 500;
      margin-bottom: 1.5rem;
      font-family: var(--font-space);
      letter-spacing: 0.5px;

      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--accent-secondary);
        animation: glow 2s ease-in-out infinite;
      }
    }

    h1 {
      font-family: var(--font-space);
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 700;
      line-height: 1.1;
      margin-bottom: 1.2rem;
      color: var(--white);

      .gradient-text {
        background: var(--accent-gradient-vivid);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: gradientShift 4s ease infinite;
      }
    }

    p {
      font-size: 1.1rem;
      color: var(--white-muted);
      margin-bottom: 2rem;
      line-height: 1.7;
      max-width: 480px;

      @media (max-width: 960px) {
        max-width: 100%;
      }
    }

    .buttons {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;

      @media (max-width: 960px) {
        justify-content: center;
      }
    }

    .btn-primary {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.9rem 2rem;
      border-radius: var(--radius-md);
      font-family: var(--font-space);
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--white);
      background: var(--accent-gradient);
      background-size: 200% 200%;
      border: none;
      cursor: pointer;
      transition: all 0.4s ease;
      box-shadow: 0 4px 20px rgba(124, 58, 237, 0.4);
      overflow: hidden;

      &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.2),
          transparent
        );
        background-size: 200% 100%;
        animation: shimmer 3s infinite;
      }

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 30px rgba(124, 58, 237, 0.5);
      }

      svg {
        transition: transform 0.3s;
      }

      &:hover svg {
        transform: translateX(4px);
      }
    }

    .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.9rem 2rem;
      border-radius: var(--radius-md);
      font-family: var(--font-space);
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--white);
      background: transparent;
      border: 1px solid var(--glass-border);
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(8px);

      &:hover {
        border-color: var(--accent-primary);
        background: rgba(124, 58, 237, 0.1);
        transform: translateY(-2px);
      }
    }
  }

  .hero-visual {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;

    @media (max-width: 960px) {
      width: 100%;
      max-width: 400px;
    }

    .image-wrapper {
      position: relative;
      width: 350px;
      height: 350px;

      @media (max-width: 960px) {
        width: 260px;
        height: 260px;
      }

      .glow-ring {
        position: absolute;
        inset: -15px;
        border-radius: 50%;
        border: 2px solid transparent;
        background: conic-gradient(
            from 0deg,
            var(--accent-primary),
            var(--accent-secondary),
            var(--accent-cyan),
            var(--accent-primary)
          )
          border-box;
        -webkit-mask:
          linear-gradient(#fff 0 0) padding-box,
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        animation: rotate 6s linear infinite;
        opacity: 0.6;
      }

      .photo {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid var(--glass-border);

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
        }
      }

      .floating-card {
        position: absolute;
        background: var(--glass-bg);
        backdrop-filter: blur(16px);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-md);
        padding: 0.8rem 1.2rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: var(--glass-shadow);
        white-space: nowrap;

        .icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }

        .label {
          font-family: var(--font-space);
          font-size: 0.75rem;
          color: var(--white-muted);
        }

        .value {
          font-family: var(--font-space);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--white);
        }

        &.card-1 {
          top: 5%;
          right: -15%;
          animation: float 5s ease-in-out infinite;

          .icon {
            background: rgba(124, 58, 237, 0.2);
            color: var(--accent-primary-light);
          }
        }

        &.card-2 {
          bottom: 10%;
          left: -20%;
          animation: float 6s ease-in-out infinite 1s;

          .icon {
            background: rgba(6, 214, 160, 0.2);
            color: var(--accent-secondary);
          }
        }

        @media (max-width: 960px) {
          &.card-1 {
            right: -5%;
          }
          &.card-2 {
            left: -5%;
          }
        }
      }
    }
  }
`;

/* =====================================
   ABOUT SECTION
======================================= */
export const About = styled(motion.section)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
  position: relative;

  .section-header {
    text-align: center;
    margin-bottom: 4rem;

    .label {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-family: var(--font-space);
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: var(--accent-primary-light);
      margin-bottom: 1rem;

      &::before,
      &::after {
        content: "";
        width: 30px;
        height: 1px;
        background: var(--accent-gradient);
      }
    }

    h2 {
      font-family: var(--font-space);
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 700;
      color: var(--white);
      line-height: 1.2;
    }
  }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;

    @media (max-width: 860px) {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }

  .about-content {
    p {
      color: var(--white-muted);
      font-size: 1.05rem;
      line-height: 1.8;
      margin-bottom: 1.5rem;
    }

    .stats-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      margin: 2rem 0;

      @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .stat {
        text-align: center;
        padding: 1.5rem 1rem;
        border-radius: var(--radius-md);
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        transition: all 0.3s ease;

        &:hover {
          border-color: var(--accent-primary);
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(124, 58, 237, 0.15);
        }

        .number {
          font-family: var(--font-space);
          font-size: 2rem;
          font-weight: 700;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .label {
          font-size: 0.85rem;
          color: var(--white-muted);
          margin-top: 0.3rem;
        }
      }
    }
  }

  .skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 1.5rem;

    .skill-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.5rem 1rem;
      border-radius: 99px;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      font-family: var(--font-space);
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--white-muted);
      transition: all 0.3s ease;

      img {
        width: 18px;
        height: 18px;
        border-radius: 3px;
      }

      &:hover {
        border-color: var(--accent-primary);
        color: var(--white);
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(124, 58, 237, 0.15);
      }
    }
  }

  .about-images {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    max-height: 550px;
    overflow: hidden;
    border-radius: var(--radius-lg);

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background: radial-gradient(
        ellipse at center,
        transparent 40%,
        var(--black) 100%
      );
      z-index: 1;
      pointer-events: none;
    }

    .col {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      &.col-left {
        animation: moveImages 18s infinite ease-in-out;
      }

      &.col-right {
        animation: moveImages2 22s infinite ease-in-out;
      }

      img {
        border-radius: var(--radius-sm);
        width: 100%;
        object-fit: cover;
        filter: grayscale(40%) brightness(0.8);
        transition: all 0.5s ease;

        &:hover {
          filter: grayscale(0%) brightness(1);
        }
      }
    }

    @keyframes moveImages {
      0% {
        transform: translateY(-8rem);
      }
      30% {
        transform: translateY(-1rem);
      }
      60% {
        transform: translateY(-14rem);
      }
      100% {
        transform: translateY(-8rem);
      }
    }

    @keyframes moveImages2 {
      0% {
        transform: translateY(-8rem);
      }
      50% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-8rem);
      }
    }
  }
`;

/* =====================================
   PROJECTS SECTION
======================================= */
export const Projects = styled(motion.section)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;

  .section-header {
    text-align: center;
    margin-bottom: 4rem;

    .label {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-family: var(--font-space);
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: var(--accent-primary-light);
      margin-bottom: 1rem;

      &::before,
      &::after {
        content: "";
        width: 30px;
        height: 1px;
        background: var(--accent-gradient);
      }
    }

    h2 {
      font-family: var(--font-space);
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 700;
      color: var(--white);
      line-height: 1.2;
    }

    p {
      color: var(--white-muted);
      font-size: 1rem;
      margin-top: 0.8rem;
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;

    @media (max-width: 960px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .project-card {
    position: relative;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 260px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    overflow: hidden;
    cursor: pointer;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background: var(--accent-gradient);
      opacity: 0;
      transition: opacity 0.4s ease;
      border-radius: var(--radius-lg);
    }

    &:hover {
      transform: translateY(-8px);
      border-color: rgba(124, 58, 237, 0.3);
      box-shadow:
        0 20px 40px rgba(124, 58, 237, 0.15),
        0 0 80px rgba(124, 58, 237, 0.05);

      &::before {
        opacity: 0.05;
      }

      .project-logo {
        transform: scale(1.05);
      }

      .project-link {
        opacity: 1;
        transform: translateY(0);

        svg {
          transform: translateX(3px);
        }
      }
    }

    .project-logo {
      position: relative;
      z-index: 1;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      transition: transform 0.4s ease;

      img {
        max-height: 80px;
        max-width: 200px;
        object-fit: contain;
        filter: brightness(0.9);
      }
    }

    .project-name {
      position: relative;
      z-index: 1;
      font-family: var(--font-space);
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--white);
      margin-bottom: 0.5rem;
    }

    .project-link {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-family: var(--font-space);
      font-size: 0.85rem;
      color: var(--accent-primary-light);
      opacity: 0;
      transform: translateY(8px);
      transition: all 0.3s ease;

      svg {
        transition: transform 0.3s ease;
      }
    }
  }
`;

/* =====================================
   EXPERIENCE SECTION
======================================= */
export const Experience = styled(motion.section)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;

  .section-header {
    text-align: center;
    margin-bottom: 4rem;

    .label {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-family: var(--font-space);
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: var(--accent-primary-light);
      margin-bottom: 1rem;

      &::before,
      &::after {
        content: "";
        width: 30px;
        height: 1px;
        background: var(--accent-gradient);
      }
    }

    h2 {
      font-family: var(--font-space);
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 700;
      color: var(--white);
      line-height: 1.2;
    }
  }

  .timeline {
    position: relative;
    max-width: 800px;
    margin: 0 auto;

    &::before {
      content: "";
      position: absolute;
      left: 20px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(
        180deg,
        var(--accent-primary),
        var(--accent-secondary),
        transparent
      );

      @media (max-width: 600px) {
        left: 12px;
      }
    }
  }

  .timeline-item {
    position: relative;
    padding-left: 60px;
    padding-bottom: 3rem;

    @media (max-width: 600px) {
      padding-left: 44px;
    }

    &:last-child {
      padding-bottom: 0;
    }

    .dot {
      position: absolute;
      left: 12px;
      top: 6px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--accent-gradient);
      border: 3px solid var(--black);
      z-index: 1;

      @media (max-width: 600px) {
        left: 4px;
        width: 16px;
        height: 16px;
      }
    }

    &.current .dot {
      box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.3);
      animation: glow 2s ease-in-out infinite;
    }

    .card {
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-lg);
      padding: 1.5rem 2rem;
      transition: all 0.3s ease;

      &:hover {
        border-color: rgba(124, 58, 237, 0.3);
        transform: translateX(4px);
        box-shadow: 0 8px 25px rgba(124, 58, 237, 0.1);
      }

      .period {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        font-family: var(--font-space);
        font-size: 0.75rem;
        color: var(--accent-secondary);
        font-weight: 500;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      h3 {
        font-family: var(--font-space);
        font-size: 1.15rem;
        font-weight: 700;
        color: var(--white);
        margin-bottom: 0.2rem;
      }

      .company {
        font-family: var(--font-space);
        font-size: 0.9rem;
        color: var(--accent-primary-light);
        font-weight: 500;
        margin-bottom: 0.8rem;
      }

      p {
        font-size: 0.9rem;
        color: var(--white-muted);
        line-height: 1.7;
      }

      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        margin-top: 1rem;

        span {
          padding: 0.25rem 0.7rem;
          border-radius: 99px;
          background: rgba(124, 58, 237, 0.1);
          border: 1px solid rgba(124, 58, 237, 0.2);
          font-family: var(--font-space);
          font-size: 0.7rem;
          font-weight: 500;
          color: var(--accent-primary-light);
        }
      }
    }
  }
`;

/* =====================================
   EDUCATION & EXTRAS SECTION
======================================= */
export const Education = styled(motion.section)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;

  .section-header {
    text-align: center;
    margin-bottom: 4rem;

    .label {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-family: var(--font-space);
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: var(--accent-primary-light);
      margin-bottom: 1rem;

      &::before,
      &::after {
        content: "";
        width: 30px;
        height: 1px;
        background: var(--accent-gradient);
      }
    }

    h2 {
      font-family: var(--font-space);
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 700;
      color: var(--white);
      line-height: 1.2;
    }
  }

  .edu-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;

    @media (max-width: 760px) {
      grid-template-columns: 1fr;
    }
  }

  .edu-column {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    h3 {
      font-family: var(--font-space);
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--white);
      display: flex;
      align-items: center;
      gap: 0.5rem;

      svg {
        color: var(--accent-primary-light);
      }
    }
  }

  .edu-card {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    padding: 1.3rem 1.5rem;
    transition: all 0.3s ease;

    &:hover {
      border-color: rgba(124, 58, 237, 0.3);
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(124, 58, 237, 0.1);
    }

    .title {
      font-family: var(--font-space);
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--white);
      margin-bottom: 0.2rem;
    }

    .school {
      font-size: 0.85rem;
      color: var(--accent-primary-light);
      margin-bottom: 0.2rem;
    }

    .period {
      font-family: var(--font-space);
      font-size: 0.75rem;
      color: var(--white-muted);
    }
  }

  .cert-card {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    padding: 1rem 1.3rem;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.8rem;

    &:hover {
      border-color: rgba(6, 214, 160, 0.3);
      transform: translateY(-2px);
    }

    .icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 1rem;
    }

    .info {
      .name {
        font-family: var(--font-space);
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--white);
      }
      .detail {
        font-size: 0.75rem;
        color: var(--white-muted);
      }
    }

    &.cert .icon {
      background: rgba(6, 214, 160, 0.15);
      color: var(--accent-secondary);
    }

    &.lang .icon {
      background: rgba(34, 211, 238, 0.15);
      color: var(--accent-cyan);
    }
  }
`;
