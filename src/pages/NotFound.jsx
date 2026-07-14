import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container className="empty-page-state text-center">
      <p className="error-code">404</p>
      <h1 className="section-title">Página no encontrada</h1>
      <p className="text-secondary">La dirección solicitada no existe o fue movida.</p>
      <Button as={Link} to="/" variant="primary">Volver al inicio</Button>
    </Container>
  );
}

export default NotFound;
