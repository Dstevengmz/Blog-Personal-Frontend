import { Container } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import profile from '../profile.config';

function AppFooter() {
  return (
    <footer className="app-footer">
      <Container className="app-footer__inner">
        <p className="app-footer__name">{profile.displayName}</p>
        <p className="app-footer__tagline">
          Análisis de datos · Inteligencia artificial · Desarrollo de software
        </p>
        <div className="app-footer__icons">
          <a
            href="https://github.com/dstevengmz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/dstevengmz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://www.instagram.com/dstevengmz1/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>
        </div>
        <p className="app-footer__copy">
          © {new Date().getFullYear()} Darwin Gomez — Construido con React &amp; Node.js
        </p>
      </Container>
    </footer>
  );
}

export default AppFooter;
