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
import Image from "next/image";
import { Variants, motion } from "framer-motion";

const Home: NextPage = () => {
  const cardVariants: Variants = {
    offscreen: {
      opacity: 0,
      y: 80,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1,
        staggerChildren: 0.2,
      },
    },
  };

  const cardProj: Variants = {
    offscreen: {
      opacity: 0,
      x: -40,
    },
    onscreen: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        duration: 1,
        bounce: 0.4,
      },
    },
  };

  return (
    <main>
      <Container id="home">
        <div className="text">
          <h1>
            Seja bem-vindo <br /> à <span>NEGO</span> <span>TECH</span>
          </h1>
          <p>
            Eu sou Lucas Lourenço e quero te ajudar com soluções de programação
            WEB. Vamos começar?
          </p>

          <div className="buttons">
            <a
              href="https://api.whatsapp.com/send?phone=5567981611571&text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20de%20Site/Design."
              title="Entre em contato"
              target="__blank"
            >
              Entre em contato
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
          <motion.div
            className="social"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                opacity: 0,
              },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <motion.a
              href="https://www.instagram.com/nego.tech"
              title="http://www.instagram.com/nego.tech"
              target="__blank"
              variants={{
                hidden: {
                  opacity: 0,
                  transform: "translateX(-0.5rem)",
                },
                visible: {
                  opacity: 1,
                  transform: "translateX(0)",
                },
              }}
            >
              <FaInstagram size={36} color="var(--principal-400)" />
            </motion.a>
            <motion.a
              href="https://www.facebook.com/negotech22"
              title="https://www.facebook.com/negotech22"
              target="__blank"
              variants={{
                hidden: {
                  opacity: 0,
                  transform: "translateX(-0.5rem)",
                },
                visible: {
                  opacity: 1,
                  transform: "translateX(0)",
                },
              }}
            >
              <FaFacebookSquare size={36} color="var(--principal-400)" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/lucas-lourenco2802"
              title="https://www.linkedin.com/in/lucas-lourenco2802"
              target="__blank"
              variants={{
                hidden: {
                  opacity: 0,
                  transform: "translateX(-0.5rem)",
                },
                visible: {
                  opacity: 1,
                  transform: "translateX(0)",
                },
              }}
            >
              <FaLinkedin size={36} color="var(--principal-400)" />
            </motion.a>
            <motion.a
              href="https://github.com/lucas-lourencoo"
              title="https://github.com/lucas-lourenco"
              target="__blank"
              variants={{
                hidden: {
                  opacity: 0,
                  transform: "translateX(-0.5rem)",
                },
                visible: {
                  opacity: 1,
                  transform: "translateX(0)",
                },
              }}
            >
              <FaGithub size={36} color="var(--principal-400)" />
            </motion.a>
          </motion.div>
        </div>
      </Container>

      <About
        id="about"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.35, once: true }}
        variants={cardVariants}
      >
        <div className="aboutMe">
          <h2>Sobre mim</h2>
          <h3>Lucas Lourenço Silva</h3>

          <article>
            <p>
              Sou um desenvolvedor front-end apaixonado por solucionar problemas
              através da programação! 🚀
            </p>
            <p>
              Tenho mais de 5 anos de experiência na áera de desenvolvimento.
              Minha jornada na programação começou em 2016, aos meus 16 anos,
              quando iniciei meu curso técnico no Instituto Federal. Desde
              então, venho aprimorando minhas habilidades e me aprofundando cada
              vez mais.
            </p>
            <p>
              Sou proficiente em projetar, animar e codificar projetos, sempre
              buscando criar interfaces que proporcionem experiências
              excepcionais. Também tenho experiência sólida como desenvolvedor
              Full-Stack, o que me permite compreender e criar projetos de ponta
              a ponta.
            </p>

            <ul>
              <li>
                <Image
                  src="check-circle.svg"
                  alt="Circle Check"
                  width={23}
                  height={23}
                />
                <span>Desenvolvedor Fullstack/Front-end </span>
              </li>
              <li>
                <Image
                  src="check-circle.svg"
                  alt="Circle Check"
                  width={23}
                  height={23}
                />
                <span>Desenvolvedor freelancer</span>
              </li>
              <li>
                <Image
                  src="check-circle.svg"
                  alt="Circle Check"
                  width={23}
                  height={23}
                />
                <span>
                  Stacks: Javascript, React, Next, Node, PHP, Java e TS
                </span>
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

            <ul className="technologies">
              <li>
                <Image
                  src="/logos/javascript.png"
                  alt="Javascript logo"
                  width={52}
                  height={52}
                />
              </li>
              <li>
                <Image
                  src="/logos/typescript.png"
                  alt="typescript logo"
                  width={52}
                  height={52}
                />
              </li>
              <li>
                <Image
                  src="/logos/react-logo.png"
                  alt="React.js logo"
                  width={52}
                  height={52}
                />
              </li>
              <li>
                <Image
                  src="/logos/next.svg"
                  alt="Next.js logo"
                  width={52}
                  height={52}
                  style={{
                    filter: "invert()",
                  }}
                />
              </li>
              <li>
                <Image
                  src="/logos/html5.png"
                  alt="HTML5 logo"
                  width={52}
                  height={52}
                />
              </li>
              <li>
                <Image
                  src="/logos/css3.png"
                  alt="CSS 3 logo"
                  width={52}
                  height={52}
                />
              </li>
              <li>
                <Image
                  src="/logos/redux.svg"
                  alt="Redux logo"
                  width={52}
                  height={52}
                />
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

      <Projects
        id="projects"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.35, once: true }}
        variants={cardVariants}
      >
        <h2>Portfólio</h2>
        <h3>Alguns dos meus projetos</h3>

        <div className="grid">
          <motion.div className="portItem" variants={cardProj}>
            <Image
              src="/verano.png"
              alt="Logo Cor de Verano"
              width={300}
              height={80}
            />
            <p>Cor de Verano</p>
            <a href="https://www.cordeverano.com.br/" target="__blank">
              <FiArrowRight strokeWidth={3} />
              Visualizar projeto
            </a>
          </motion.div>
          <motion.div className="portItem" variants={cardProj}>
            <Image
              src="/dual.webp"
              alt="Logo Dual Serviços"
              width={67}
              height={89}
            />
            <p>Dual Serviços</p>
            <a
              href="https://www.dualservicosterceirizados.com.br/"
              target="__blank"
            >
              <FiArrowRight strokeWidth={3} />
              Visualizar projeto
            </a>
          </motion.div>
          <motion.div className="portItem" variants={cardProj}>
            <Image
              src="/agf.webp"
              alt="Logo AGF Garantidora"
              width={230}
              height={89}
            />
            <p>AGF Garantidora</p>
            <a href="https://www.agfgarantidora.com.br/" target="__blank">
              <FiArrowRight strokeWidth={3} />
              Visualizar projeto
            </a>
          </motion.div>
          <motion.div className="portItem" variants={cardProj}>
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
          </motion.div>
          <motion.div className="portItem" variants={cardProj}>
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
          </motion.div>
          <motion.div className="portItem" variants={cardProj}>
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
          </motion.div>
          <motion.div className="portItem" variants={cardProj}>
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
          </motion.div>
          <motion.div className="portItem" variants={cardProj}>
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
          </motion.div>
          <motion.div className="portItem" variants={cardProj}>
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
          </motion.div>
        </div>
      </Projects>
    </main>
  );
};

export default Home;
