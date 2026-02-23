"use client";

import Image from "next/image";
import { Container } from "./styles";
import { Link } from "react-scroll";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "home", label: "Home", offset: -200 },
  { to: "about", label: "Sobre", offset: 0 },
  { to: "experience", label: "Experiência", offset: -70 },
  { to: "projects", label: "Projetos", offset: -70 },
  { to: "education", label: "Formação", offset: -70 },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Container>
      <div className="center">
        <motion.div
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image src="/logo.png" alt="Logo Nego Tech" width={50} height={44} />
        </motion.div>

        <nav className="desktop-nav">
          <ul>
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  smooth={true}
                  offset={link.offset}
                  duration={1000}
                  href={`#${link.to}`}
                >
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
            <li className="cta">
              <a
                href="https://api.whatsapp.com/send?phone=5567981611571&text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20de%20Site/Design."
                target="_blank"
                rel="noopener noreferrer"
              >
                Contato
              </a>
            </li>
          </ul>
        </nav>

        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ul>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth={true}
                    offset={link.offset}
                    duration={1000}
                    href={`#${link.to}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://api.whatsapp.com/send?phone=5567981611571&text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20de%20Site/Design."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contato
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </Container>
  );
}
