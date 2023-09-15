"use client";

import type { NextPage } from "next";
import { About, Container, Projects } from "../../styles/pages";
import { FiArrowRight } from "react-icons/fi";
import {
  FaFacebookSquare,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-scroll";
import { useEffect, useRef } from "react";
import Image from "next/image";

const Home: NextPage = () => {
  const refAbout = useRef(null);
  const refProjects = useRef(null);

  useEffect(() => {
    async function animate() {
      if (refAbout.current) {
        const sr = (await import("scrollreveal")).default;
        sr().reveal(refAbout.current, { delay: 700, duration: 1200 });
      }
      if (refProjects.current) {
        const sr = (await import("scrollreveal")).default;
        sr().reveal(refProjects.current, { delay: 700, duration: 1200 });
      }
    }
    animate();
  }, []);

  return (
    <main>
      <Container id="home">
        <div className="text">
          <h1>
            Seja bem-vindo <br /> à <span>NEGO</span> <span>TECH</span>
          </h1>
          <p>
            Eu sou Lucas Lourenço, e quero te ajudar com soluções de programação
            WEB e tecnologia em geral. Vamos começar?
          </p>

          <div className="buttons">
            <a
              href="https://api.whatsapp.com/send?phone=5567981611571&text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20de%20Site/Design."
              title="Fazer um orçamento"
              target="__blank"
            >
              Fazer um orçamento
            </a>
            <Link
              to="about"
              href="#about"
              smooth={true}
              offset={0}
              duration={1000}
            >
              Sobre mim
            </Link>
          </div>
        </div>

        <div className="image">
          <Image
            src="/Group 42.svg"
            alt="Imagem"
            width={544}
            height={567}
            quality={100}
          />
          <Image
            src="/logo-branco.png"
            alt="Logo na cor branca"
            quality={100}
            width={340}
            height={260}
          />
        </div>

        <div className="goDown">
          <Image src="/godown.svg" alt="Arrow Down" width={70} height={70} />
          <div className="social">
            <a
              href="https://www.instagram.com/nego.tech"
              title="http://www.instagram.com/nego.tech"
              target="__blank"
            >
              <FaInstagram size={30} color="var(--principal-400)" />
            </a>
            <a
              href="https://www.facebook.com/negotech22"
              title="https://www.facebook.com/negotech22"
              target="__blank"
            >
              <FaFacebookSquare size={30} color="var(--principal-400)" />
            </a>
            <a
              href="https://www.linkedin.com/in/lucas-lourenco2802"
              title="https://www.linkedin.com/in/lucas-lourenco2802"
              target="__blank"
            >
              <FaLinkedin size={30} color="var(--principal-400)" />
            </a>
            <a
              href="https://github.com/lucas-lourencoo"
              title="https://github.com/lucas-lourenco"
              target="__blank"
            >
              <FaGithub size={30} color="var(--principal-400)" />
            </a>
          </div>
        </div>
      </Container>

      <About id="about" ref={refAbout}>
        <div className="aboutMe">
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
                <Image
                  src="check-circle.svg"
                  alt="Circle Check"
                  width={23}
                  height={23}
                />
                <span>Técnico em Informática pelo IFMS. </span>
              </li>
              <li>
                <Image
                  src="check-circle.svg"
                  alt="Circle Check"
                  width={23}
                  height={23}
                />
                <span>UI e Desenvolvedor freelancer</span>
              </li>
              <li>
                <Image
                  src="check-circle.svg"
                  alt="Circle Check"
                  width={23}
                  height={23}
                />
                <span>Stacks: React, Node, PHP, Java e JS</span>
              </li>
              <li>
                <Image
                  src="check-circle.svg"
                  alt="Circle Check"
                  width={23}
                  height={23}
                />
                <span>Cursando Bacharel em S.I. </span>
              </li>
            </ul>
          </article>
        </div>

        <div className="images">
          <div className="left">
            <Image
              src="/lucas2.webp"
              alt="Lucas Lourenço 1"
              width={268}
              height={476}
            />
            <Image
              src="/lucas3.jpg"
              alt="Lucas Lourenço 2"
              width={268}
              height={269}
            />
            <Image
              src="/lucas5.jpg"
              alt="Lucas Lourenço 6"
              width={268}
              height={277}
            />
          </div>
          <div className="right">
            <Image
              src="/lucas1.jpg"
              alt="Lucas Lourenço 3"
              width={268}
              height={357}
            />
            <Image
              src="/lucas4.jpg"
              alt="Lucas Lourenço 4"
              width={268}
              height={268}
            />
            <Image
              src="/lucas6.jpg"
              alt="Lucas Lourenço 5"
              width={268}
              height={408}
            />
          </div>
        </div>
      </About>

      <Projects id="projects" ref={refProjects}>
        <h2>Portfólio</h2>
        <h3>Alguns dos meus projetos</h3>

        <div className="grid">
          <div className="portItem">
            <Image
              src="/fire.png"
              alt="Fogo Juventude UP"
              width={111}
              height={128}
            />
            <p>Juventude UP</p>
            <a href="https://www.juventudeup.com.br/" target="__blank">
              <FiArrowRight strokeWidth={3} />
              Visualizar projeto
            </a>
          </div>
          <div className="portItem">
            <Image
              src="/viamaq.png"
              alt="Logo Viamaq"
              width={242}
              height={86}
            />
            <p>Viamaq</p>
            <a href="https://viamaqtratores.com.br/" target="__blank">
              <FiArrowRight strokeWidth={3} />
              Visualizar projeto
            </a>
          </div>
          <div className="portItem">
            <Image
              src="/fazendas.png"
              alt="Logo Fazendas do Brasil"
              width={245}
              height={65}
            />
            <p>Fazendas do Brasil</p>
            <a href="https://www.fazendasdobrasil.com.br/" target="__blank">
              <FiArrowRight strokeWidth={3} />
              Visualizar projeto
            </a>
          </div>
          <div className="portItem">
            <Image
              src="/ieducaa.png"
              alt="Logo IEDUCAA"
              width={238}
              height={70}
            />
            <p>IEDUCAA</p>
            <a href="https://www.ieducaa.org/" target="__blank">
              <FiArrowRight strokeWidth={3} />
              Visualizar projeto
            </a>
          </div>
          <div className="portItem">
            <Image
              src="/israel.png"
              alt="Logo Israel Profético"
              width={230}
              height={105}
            />
            <p>Israel Profético</p>
            <a href="https://www.israelprofetico.com.br/" target="__blank">
              <FiArrowRight strokeWidth={3} />
              Visualizar projeto
            </a>
          </div>
          <div className="portItem">
            <Image
              src="/paraguai.png"
              alt="Logo Missão Paraguai"
              width={232}
              height={80}
            />
            <p>Missão Paraguai</p>
            <a href="https://missaoparaguai.com.br/" target="__blank">
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
