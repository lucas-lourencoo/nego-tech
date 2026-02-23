"use client";

import type { NextPage } from "next";
import {
  About,
  Container,
  HeroWrapper,
  Projects,
  Experience,
  Education,
} from "../../styles/pages";
import { FiArrowRight, FiArrowUpRight, FiCalendar } from "react-icons/fi";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaCode,
  FaRocket,
  FaGraduationCap,
  FaAward,
  FaGlobe,
} from "react-icons/fa";
import { Link } from "react-scroll";
import Image from "next/image";
import { Variants, motion } from "framer-motion";

const Home: NextPage = () => {
  const fadeUp: Variants = {
    offscreen: { opacity: 0, y: 60 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", duration: 0.8, bounce: 0.3 },
    },
  };

  const stagger: Variants = {
    offscreen: { opacity: 0 },
    onscreen: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const fadeIn: Variants = {
    offscreen: { opacity: 0, y: 30 },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", duration: 0.8 },
    },
  };

  const scaleIn: Variants = {
    offscreen: { opacity: 0, scale: 0.9 },
    onscreen: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", duration: 0.6 },
    },
  };

  const projects = [
    {
      name: "Cor de Verano",
      logo: "/verano.png",
      logoW: 300,
      logoH: 80,
      url: "https://www.cordeverano.com.br/",
    },
    {
      name: "Dual Serviços",
      logo: "/dual.webp",
      logoW: 67,
      logoH: 89,
      url: "https://www.dualservicosterceirizados.com.br/",
    },
    {
      name: "AGF Garantidora",
      logo: "/agf.webp",
      logoW: 230,
      logoH: 89,
      url: "https://www.agfgarantidora.com.br/",
    },
    {
      name: "Juventude UP",
      logo: "/fire.png",
      logoW: 111,
      logoH: 128,
      url: "https://www.juventudeup.com.br/",
    },
    {
      name: "Viamaq",
      logo: "/viamaq.png",
      logoW: 242,
      logoH: 86,
      url: "https://viamaqtratores.com.br/",
    },
    {
      name: "Fazendas do Brasil",
      logo: "/fazendas.png",
      logoW: 245,
      logoH: 65,
      url: "https://www.fazendasdobrasil.com.br/",
    },
    {
      name: "IEDUCAA",
      logo: "/ieducaa.png",
      logoW: 238,
      logoH: 70,
      url: "https://www.ieducaa.org/",
    },
    {
      name: "Israel Profético",
      logo: "/israel.png",
      logoW: 230,
      logoH: 105,
      url: "https://www.israelprofetico.com.br/",
    },
    {
      name: "Missão Paraguai",
      logo: "/paraguai.png",
      logoW: 232,
      logoH: 80,
      url: "https://missaoparaguai.com.br/",
    },
  ];

  const skills = [
    { name: "JavaScript", icon: "/logos/javascript.png" },
    { name: "TypeScript", icon: "/logos/typescript.png" },
    { name: "React", icon: "/logos/react-logo.png" },
    { name: "Next.js", icon: "/logos/next.svg", invert: true },
    { name: "Node.js", icon: "/logos/node.png" },
    { name: "NestJS", icon: "/logos/node.png" },
    { name: "GraphQL", icon: "/logos/javascript.png" },
    { name: "Redux", icon: "/logos/redux.svg" },
    { name: "HTML5", icon: "/logos/html5.png" },
    { name: "CSS3", icon: "/logos/css3.png" },
  ];

  const experiences = [
    {
      current: true,
      period: "Mai 2025 — Presente",
      role: "Desenvolvedor Full-Stack",
      company: "Connectabil",
      description:
        "Primeira HR-tech focada na seleção de profissionais do mercado contábil e financeiro. Atuando no desenvolvimento full-stack do ecossistema, usando tecnologia para selecionar os melhores talentos com avaliações técnicas e comportamentais.",
      tags: ["React", "Next.js", "Node.js", "TypeScript", "GraphQL"],
    },
    {
      current: false,
      period: "Jun 2024 — Mai 2025",
      role: "Desenvolvedor Full-Stack",
      company: "DFCom Software House",
      description:
        "Liderança técnica em features, definição de arquitetura de componentes, mentoria estruturada para juniors e participação em entrevistas técnicas.",
      tags: ["React", "Liderança Técnica", "Mentoria", "Arquitetura"],
    },
    {
      current: false,
      period: "Set 2022 — Out 2023",
      role: "Desenvolvedor Front-end",
      company: "dotkon / Amaggi",
      description:
        "Manutenção e migração da plataforma Originar utilizando React e Next. Desenvolvimento de ferramentas de georreferenciamento com Leaflet. Criação do Design System com Tailwind, Storybook e Jest.",
      tags: ["React", "Next.js", "Leaflet", "Storybook", "Tailwind", "Redux"],
    },
    {
      current: false,
      period: "Out 2020 — Set 2022",
      role: "Programador de Sistemas",
      company: "Ministério Atos de Justiça",
      description:
        "Coordenação do setor de desenvolvimento. Criação de sites institucionais, sistema de requisições com Websockets para real-time, Node.js e envio de e-mails automáticos.",
      tags: ["Next.js", "React", "Node.js", "Websockets", "Redux"],
    },
    {
      current: false,
      period: "Ago 2019 — Jun 2020",
      role: "Assistente de TI",
      company: "Ciarama Máquinas John Deere",
      description:
        "Suporte técnico de T.I. e desenvolvimento de sistema para impressão de etiquetas. Suporte e novas features do sistema Totvs.",
      tags: ["Suporte TI", "Totvs", "Automação"],
    },
  ];

  const education = [
    {
      title: "Bacharelado em Sistemas de Informação",
      school: "Estácio",
      period: "2022 — 2025",
    },
    {
      title: "Bacharelado em Sistemas de Informação",
      school: "Universidade Federal de Mato Grosso do Sul",
      period: "2020 — 2022",
    },
    {
      title: "Técnico em Informática",
      school: "IFMS — Instituto Federal de MS",
      period: "2016 — 2019",
    },
  ];

  const certifications = [
    { name: "Next Generation", detail: "AI for Devs" },
    {
      name: "EF SET English Certificate",
      detail: "B2 Upper Intermediate (53/100)",
    },
    { name: "Programação para Internet", detail: "Curso completo" },
    { name: "Ignite", detail: "Rocketseat — Certificado de conclusão" },
  ];

  const languages = [
    { name: "Português", detail: "Nativo" },
    { name: "Espanhol", detail: "Profissional completo" },
    { name: "Inglês", detail: "B2 — Upper Intermediate" },
  ];

  return (
    <main>
      {/* ============ HERO ============ */}
      <HeroWrapper>
        <Container id="home">
          <motion.div
            className="text"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="dot" />
              Disponível para projetos
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Olá, eu sou o
              <br />
              <span className="gradient-text">Lucas Lourenço</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Desenvolvedor Full-Stack com mais de 7 anos de experiência criando
              soluções web modernas com React, Next.js e Node.js. Apaixonado por
              liderança técnica, design de interfaces e inovação.
            </motion.p>

            <motion.div
              className="buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <a
                href="https://api.whatsapp.com/send?phone=5567981611571&text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20de%20Site/Design."
                title="Entre em contato"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Vamos conversar
                <FiArrowRight size={18} />
              </a>
              <Link
                to="experience"
                href="#experience"
                smooth={true}
                offset={-70}
                duration={1000}
                className="btn-secondary"
              >
                Ver experiência
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            <div className="image-wrapper">
              <div className="glow-ring" />
              <div className="photo">
                <Image
                  src="/51462903.png"
                  alt="Lucas Lourenço"
                  width={350}
                  height={350}
                  quality={90}
                  priority
                />
              </div>

              <motion.div
                className="floating-card card-1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div className="icon">
                  <FaCode />
                </div>
                <div>
                  <div className="label">Experiência</div>
                  <div className="value">+7 anos</div>
                </div>
              </motion.div>

              <motion.div
                className="floating-card card-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <div className="icon">
                  <FaRocket />
                </div>
                <div>
                  <div className="label">Projetos</div>
                  <div className="value">+50 entregues</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Container>

        <motion.div
          className="social-bar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <motion.a
            href="https://www.instagram.com/nego.tech"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
          >
            <FaInstagram size={18} />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/lucas-lourenco2802"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
          >
            <FaLinkedin size={18} />
          </motion.a>
          <motion.a
            href="https://github.com/lucas-lourencoo"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
          >
            <FaGithub size={18} />
          </motion.a>
        </motion.div>
      </HeroWrapper>

      {/* ============ ABOUT ============ */}
      <About
        id="about"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.2, once: true }}
        variants={stagger}
      >
        <motion.div className="section-header" variants={fadeUp}>
          <div className="label">Sobre mim</div>
          <h2>Conheça minha trajetória</h2>
        </motion.div>

        <div className="about-grid">
          <motion.div className="about-content" variants={stagger}>
            <motion.p variants={fadeIn}>
              Desenvolvedor Full-Stack apaixonado por solucionar problemas
              através da programação e do design. Minha jornada começou em 2016,
              aos 16 anos, durante o curso técnico no IFMS, e desde então venho
              aprimorando minhas habilidades continuamente.
            </motion.p>

            <motion.p variants={fadeIn}>
              Tenho experiência sólida com React, Next.js, Node.js, NestJS e
              GraphQL. Atuo com liderança técnica, mentoria de juniors,
              definição de arquitetura e participação em entrevistas técnicas.
              Busco sempre estar atualizado com as novas tendências do mercado.
            </motion.p>

            <motion.div className="stats-row" variants={stagger}>
              <motion.div className="stat" variants={scaleIn}>
                <div className="number">7+</div>
                <div className="label">Anos de Experiência</div>
              </motion.div>
              <motion.div className="stat" variants={scaleIn}>
                <div className="number">50+</div>
                <div className="label">Projetos Entregues</div>
              </motion.div>
              <motion.div className="stat" variants={scaleIn}>
                <div className="number">5</div>
                <div className="label">Empresas</div>
              </motion.div>
            </motion.div>

            <motion.div className="skills-grid" variants={stagger}>
              {skills.map((skill, i) => (
                <motion.div
                  key={i}
                  className="skill-pill"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                >
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={18}
                    height={18}
                    style={skill.invert ? { filter: "invert()" } : undefined}
                  />
                  {skill.name}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="about-images" variants={fadeIn}>
            <div className="col col-left">
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
                alt="Lucas Lourenço 3"
                width={268}
                height={277}
              />
            </div>
            <div className="col col-right">
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
              <Image
                src="/lucas2.webp"
                alt="Lucas Lourenço 6"
                width={268}
                height={476}
              />
            </div>
          </motion.div>
        </div>
      </About>

      {/* ============ EXPERIENCE ============ */}
      <Experience
        id="experience"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.1, once: true }}
        variants={stagger}
      >
        <motion.div className="section-header" variants={fadeUp}>
          <div className="label">Experiência</div>
          <h2>Minha jornada profissional</h2>
        </motion.div>

        <div className="timeline">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              className={`timeline-item ${exp.current ? "current" : ""}`}
              variants={fadeIn}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="dot" />
              <div className="card">
                <div className="period">
                  <FiCalendar size={12} />
                  {exp.period}
                </div>
                <h3>{exp.role}</h3>
                <div className="company">{exp.company}</div>
                <p>{exp.description}</p>
                <div className="tags">
                  {exp.tags.map((tag, j) => (
                    <span key={j}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Experience>

      {/* ============ PROJECTS ============ */}
      <Projects
        id="projects"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.15, once: true }}
        variants={stagger}
      >
        <motion.div className="section-header" variants={fadeUp}>
          <div className="label">Portfólio</div>
          <h2>Projetos em destaque</h2>
          <p>Uma seleção dos projetos que desenvolvi</p>
        </motion.div>

        <motion.div className="grid" variants={stagger}>
          {projects.map((project, i) => (
            <motion.a
              key={i}
              className="project-card"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeIn}
              whileHover={{ y: -8 }}
            >
              <div className="project-logo">
                <Image
                  src={project.logo}
                  alt={`Logo ${project.name}`}
                  width={project.logoW}
                  height={project.logoH}
                />
              </div>
              <span className="project-name">{project.name}</span>
              <span className="project-link">
                Ver projeto <FiArrowUpRight size={16} />
              </span>
            </motion.a>
          ))}
        </motion.div>
      </Projects>

      {/* ============ EDUCATION & CERTIFICATIONS ============ */}
      <Education
        id="education"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.15, once: true }}
        variants={stagger}
      >
        <motion.div className="section-header" variants={fadeUp}>
          <div className="label">Formação</div>
          <h2>Educação & Certificações</h2>
        </motion.div>

        <div className="edu-grid">
          {/* Left column: Education + Certifications */}
          <motion.div className="edu-column" variants={stagger}>
            <motion.h3 variants={fadeIn}>
              <FaGraduationCap size={20} /> Formação Acadêmica
            </motion.h3>

            {education.map((edu, i) => (
              <motion.div key={i} className="edu-card" variants={fadeIn}>
                <div className="title">{edu.title}</div>
                <div className="school">{edu.school}</div>
                <div className="period">{edu.period}</div>
              </motion.div>
            ))}

            <motion.h3 variants={fadeIn} style={{ marginTop: "1rem" }}>
              <FaAward size={18} /> Certificações
            </motion.h3>

            {certifications.map((cert, i) => (
              <motion.div key={i} className="cert-card cert" variants={fadeIn}>
                <div className="icon">
                  <FaAward />
                </div>
                <div className="info">
                  <div className="name">{cert.name}</div>
                  <div className="detail">{cert.detail}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right column: Languages */}
          <motion.div className="edu-column" variants={stagger}>
            <motion.h3 variants={fadeIn}>
              <FaGlobe size={18} /> Idiomas
            </motion.h3>

            {languages.map((lang, i) => (
              <motion.div key={i} className="cert-card lang" variants={fadeIn}>
                <div className="icon">
                  <FaGlobe />
                </div>
                <div className="info">
                  <div className="name">{lang.name}</div>
                  <div className="detail">{lang.detail}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Education>
    </main>
  );
};

export default Home;
