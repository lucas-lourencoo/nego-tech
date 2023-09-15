import Image from "next/image";
import { Container } from "./styles";
import { Link } from "react-scroll";

export default function Header() {
  return (
    <Container>
      <div className="center">
        <Image src="/logo.png" alt="Logo Saint Tech" width={76} height={66} />

        <nav>
          <ul>
            <li>
              <Link
                to="home"
                smooth={true}
                offset={-200}
                duration={1000}
                href="#home"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="about"
                href="#about"
                smooth={true}
                offset={0}
                duration={1000}
              >
                Sobre mim
              </Link>
            </li>
            <li>
              <Link
                to="projects"
                href="#projects"
                smooth={true}
                offset={-70}
                duration={1000}
              >
                Projetos
              </Link>
            </li>
            <li>
              <a
                href="https://api.whatsapp.com/send?phone=5567981611571&text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20de%20Site/Design."
                target="__blank"
              >
                Faça um orçamento
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </Container>
  );
}
