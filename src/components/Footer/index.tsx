"use client";

import { Container } from "./styles";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const socialLinks = [
    {
      href: "https://www.instagram.com/nego.tech",
      icon: <FaInstagram size={20} />,
      label: "Instagram",
    },
    {
      href: "https://www.linkedin.com/in/lucas-lourenco2802",
      icon: <FaLinkedin size={20} />,
      label: "LinkedIn",
    },
    {
      href: "https://github.com/lucas-lourencoo",
      icon: <FaGithub size={20} />,
      label: "GitHub",
    },
  ];

  return (
    <Container>
      <div className="footer-content">
        <div className="brand">
          <h3>
            Lucas<span>.</span>
          </h3>
          <p>Criando experiências digitais com código e criatividade.</p>
        </div>

        <div className="social">
          {socialLinks.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>

        <cite>© 2026 Lucas Lourenço Silva. Todos os direitos reservados.</cite>
      </div>
    </Container>
  );
}
