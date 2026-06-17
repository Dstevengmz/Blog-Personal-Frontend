import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import profile from '../profile.config';

function AppNavbar() {
  const navigate = useNavigate();
  const isLogged = !!localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const isAdmin = user?.rol === 'admin';

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Navbar expand="lg" fixed="top" className="app-navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="app-navbar__brand">
          <span className="app-navbar__brand-name">{profile.displayName}</span>
          <span className="app-navbar__brand-sub">Data · IA · Desarrollo</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto app-navbar__links">
            <Nav.Link as={NavLink} to="/" end>
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/proyectos">
              Proyectos
            </Nav.Link>
            {/* <Nav.Link as={NavLink} to="/articulos">
              Artículos
            </Nav.Link> */}
            <Nav.Link as={NavLink} to="/contacto">
              Contacto
            </Nav.Link>
            {isAdmin && (
              <Nav.Link as={NavLink} to="/admin">
                Admin
              </Nav.Link>
            )}
          </Nav>
          <Nav className="gap-2">
            {!isLogged ? (
              <>
                <Button variant="outline-primary" size="sm" onClick={() => navigate('/registrar')}>
                  Registrarse
                </Button>
                <Button variant="primary" size="sm" onClick={() => navigate('/login')}>
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