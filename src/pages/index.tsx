import type { NextPage } from 'next';
import { About, Container, Projects } from '../styles/pages';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import {
  FaFacebookSquare,
  FaGithub,
  FaGitSquare,
  FaInstagram,
} from 'react-icons/fa';

const Home: NextPage = () => {
  return (
    <main>
      <Container id='home'>
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
            <button>Sobre mim</button>
          </div>
        </div>

        <div className='image'>
          <img src='/Group 42.svg' alt='' />
          <img src='/logo-branco.png' alt='' />
        </div>

        <div className='goDown'>
          <img src='/godown.svg' alt='Arrow Down' />
          <div className='social'>
            <a
              href='https://www.instagram.com/nego.tech'
              title='http://www.instagram.com/nego.tech'
              target='__blank'
            >
              <FaInstagram size={30} color='var(--principal-400)' />
            </a>
            <a
              href='https://www.facebook.com/negotech22'
              title='https://www.facebook.com/negotech22'
              target='__blank'
            >
              <FaFacebookSquare size={30} color='var(--principal-400)' />
            </a>
            <a
              href='https://github.com/lucas-lourencoo'
              title='https://github.com/lucas-lourenco'
              target='__blank'
            >
              <FaGithub size={30} color='var(--principal-400)' />
            </a>
          </div>
        </div>
      </Container>

      <About id='about'>
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

      <Projects id='projects'>
        <h2>Portfólio</h2>
        <h3>Alguns dos meus projetos</h3>

        <div className='grid'>
          <div className='portItem'>
            <img src='/fire.png' alt='Fogo Juventude UP' />
            <p>Juventude UP</p>
            <a href='https://www.juventudeup.com.br/' target='__blank'>
              <FiArrowRight strokeWidth={3} />
              Visualizar projeto
            </a>
          </div>
          <div className='portItem'>
            <img src='/viamaq.png' alt='Logo Viamaq' />
            <p>Viamaq</p>
            <a href='https://viamaqtratores.com.br/' target='__blank'>
              <FiArrowRight strokeWidth={3} />
              Visualizar projeto
            </a>
          </div>
          <div className='portItem'>
            <img src='/fazendas.png' alt='Logo Fazendas do Brasil' />
            <p>Fazendas do Brasil</p>
            <a href='https://www.fazendasdobrasil.com.br/' target='__blank'>
              <FiArrowRight strokeWidth={3} />
              Visualizar projeto
            </a>
          </div>
          <div className='portItem'>
            <img src='/ieducaa.png' alt='Logo IEDUCAA' />
            <p>IEDUCAA</p>
            <a href='https://www.ieducaa.org/' target='__blank'>
              <FiArrowRight strokeWidth={3} />
              Visualizar projeto
            </a>
          </div>
          <div className='portItem'>
            <img src='/israel.png' alt='Logo Israel Profético' />
            <p>Israel Profético</p>
            <a href='https://www.israelprofetico.com.br/' target='__blank'>
              <FiArrowRight strokeWidth={3} />
              Visualizar projeto
            </a>
          </div>
          <div className='portItem'>
            <img src='/paraguai.png' alt='Logo Missão Paraguai' />
            <p>Missão Paraguai</p>
            <a href='https://missaoparaguai.com.br/' target='__blank'>
              <FiArrowRight strokeWidth={3} />
              Visualizar projeto
            </a>
          </div>
        </div>
      </Projects>
    </main>
  );
};

export default Home;
