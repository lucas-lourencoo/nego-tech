import type { NextPage } from 'next';
import { About, Container } from '../styles/pages';

const Home: NextPage = () => {
  return (
    <main>
      <Container>
        <div className='text'>
          <h1>
            Seja bem-vindo <br /> à <span>NEGO</span> <span>TECH</span>
          </h1>
          <p>
            Eu sou Lucas Lourenço, e quero te ajudar com soluções de programação
            WEB e tecnologia em geral. Vamos começar?
          </p>

          <div className='buttons'>
            <button>Fazer um orçamento</button>
            <button>Sobre nós</button>
          </div>
        </div>

        <div className='image'>
          <img src='/Group 42.svg' alt='' />
          <img src='/logo-branco.png' alt='' />
        </div>

        <div className='goDown'>
          <img src='/godown.svg' />
        </div>
      </Container>

      <About>
        <div className='aboutMe'>
          <h2>Sobre mim</h2>
          <h3>Lucas Lourenço Silva</h3>

          <article>
            <p>
              Desenvolvedor Full-Stack, UI Motion e Web Designer. Atualmente
              residindo em Campo Grande/MS. Possuo + de 5 anos de experiência em
              programação para WEB, Desktop e desenvolvimento de interfaces.
            </p>
            <p>
              Hábil em projetar, animar e codificar produtos. Sempre procurando
              fazer mais interfaces com experiências fantásticas.
            </p>

            <ul>
              <li>
                <img src='check-circle.svg' alt='Circle Check' />
                <span>Técnico em Informática pelo IFMS. </span>
              </li>
              <li>
                <img src='check-circle.svg' alt='Circle Check' />
                <span>UI e Desenvolvedor freelancer</span>
              </li>
              <li>
                <img src='check-circle.svg' alt='Circle Check' />
                <span>Stacks: React, Node, PHP, Java e JS</span>
              </li>
              <li>
                <img src='check-circle.svg' alt='Circle Check' />
                <span>Cursando Bacharel em S.I. </span>
              </li>
            </ul>
          </article>
        </div>

        <div className='images'>
          <div className='left'>
            <img src='/lucas2.webp' alt='Lucas Lourenço 1' />
            <img src='/lucas3.jpg' alt='Lucas Lourenço 2' />
            <img src='/lucas5.jpg' alt='Lucas Lourenço 6' />
          </div>
          <div className='right'>
            <img src='/lucas1.jpg' alt='Lucas Lourenço 3' />
            <img src='/lucas4.jpg' alt='Lucas Lourenço 4' />
            <img src='/lucas6.jpg' alt='Lucas Lourenço 5' />
          </div>
        </div>
      </About>
    </main>
  );
};

export default Home;
