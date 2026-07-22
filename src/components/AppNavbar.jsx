import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import profile from "../profile.config";
import { clearAuthSession, getStoredToken, getStoredUser } from "../lib/authStorage";

const homeSections = ["inicio", "sobre-mi", "experiencia", "habilidades"];

function AppNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const user = getStoredUser();
  const isLogged = Boolean(getStoredToken() && user);

  useEffect(() => {
    setExpanded(false);
    if (location.pathname !== "/") return undefined;

    const updateActiveSection = () => {
      const offset = window.scrollY + 140;
      const visible = homeSections
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .filter((element) => element.offsetTop <= offset)
        .at(-1);
      setActiveSection(visible?.id || "inicio");
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [location.pathname, location.hash]);

  const closeMenu = () => setExpanded(false);
  const logout = () => {
    clearAuthSession();
    closeMenu();
    navigate("/login");
  };

  const homeLinkClass = (section) =>
    location.pathname === "/" && activeSection === section ? "active" : "";

  return (
    <Navbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={setExpanded}
      className="app-navbar"
      aria-label="Navegación principal"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" onClick={closeMenu} className="app-navbar__brand">
          <span className="app-navbar__brand-name">{profile.displayName}</span>
          <span className="app-navbar__brand-sub">Desarrollador Full Stack</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" aria-label={expanded ? "Cerrar menú" : "Abrir menú"} />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto app-navbar__links">
            <Nav.Link as={Link} to="/#inicio" onClick={closeMenu} className={homeLinkClass("inicio")}>
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/#sobre-mi" onClick={closeMenu} className={homeLinkClass("sobre-mi")}>
              Sobre mí
            </Nav.Link>
            <Nav.Link as={Link} to="/#experiencia" onClick={closeMenu} className={homeLinkClass("experiencia")}>
              Experiencia
            </Nav.Link>
            <Nav.Link as={NavLink} to="/proyectos" onClick={closeMenu}>
              Proyectos
            </Nav.Link>
            <Nav.Link as={Link} to="/#habilidades" onClick={closeMenu} className={homeLinkClass("habilidades")}>
              Habilidades
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contacto" onClick={closeMenu}>
              Contacto
            </Nav.Link>
            {user?.rol === "admin" && (
              <Nav.Link as={NavLink} to="/admin" onClick={closeMenu}>
                Admin
              </Nav.Link>
            )}
          </Nav>
          <Nav className="app-navbar__actions">
            {!isLogged ? (
              <>
                <Button as={NavLink} to="/registrar" variant="outline-primary" size="sm" onClick={closeMenu}>
                  Registrarse
                </Button>
                <Button as={NavLink} to="/login" variant="primary" size="sm" onClick={closeMenu}>
                  Iniciar sesión
                </Button>
              </>
            ) : (
              <Button variant="outline-danger" size="sm" onClick={logout}>
                Salir
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
