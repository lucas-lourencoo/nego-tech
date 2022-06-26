import type { NextPage } from 'next';
import { Container } from '../styles/pages';
import { FiArrowDown, FiArrowDownCircle } from 'react-icons/fi';

const Home: NextPage = () => {
  return (
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
  );
};

export default Home;
