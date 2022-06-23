import type { NextPage } from 'next';
import { Container } from '../styles/pages';

const Home: NextPage = () => {
  return (
    <Container>
      <div className='text'>
        <h1>Seja bem-vindo à Nego Tech</h1>
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
        <img src='/hero.svg' alt='' />
        <img src='/logo-branco.png' alt='' />
      </div>
    </Container>
  );
};

export default Home;
