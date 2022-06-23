import Link from 'next/link';
import { Container } from './styles';

export default function Header() {
  return (
    <Container>
      <img src='/logo.png' alt='Logo Saint Tech' />

      <nav>
        <ul>
          <li>
            <Link href=''>Home</Link>
          </li>
          <li>
            <Link href=''>Sobre mim</Link>
          </li>
          <li>
            <Link href=''>Projetos</Link>
          </li>
          <li>
            <Link href=''>Faça um orçamento</Link>
          </li>
        </ul>
      </nav>
    </Container>
  );
}
