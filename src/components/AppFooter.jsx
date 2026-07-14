import { Container } from "react-bootstrap";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import profile from "../profile.config";

function AppFooter() {
  return (
    <footer className="app-footer">
      <Container className="app-footer__inner">
        <p className="app-footer__name">{profile.displayName}</p>
        <p className="app-footer__tagline">
          Desarrollo de software · Aplicaciones web y móviles · APIs REST
        </p>
        <nav className="app-footer__links" aria-label="Enlaces del pie de página">
          <Link to="/proyectos">Proyectos</Link>
          <Link to="/contacto">Contacto</Link>
        </nav>
        <div className="app-footer__icons">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub de Darwin Steven Gómez">
            <FaGithub size={20} aria-hidden="true" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de Darwin Steven Gómez">
            <FaLinkedin size={20} aria-hidden="true" />
          </a>
        </div>
        <p className="app-footer__copy">
          © {new Date().getFullYear()} {profile.displayName}. Desarrollado con React y Node.js.
        </p>
      </Container>
    </footer>
  );
}

export default AppFooter;
