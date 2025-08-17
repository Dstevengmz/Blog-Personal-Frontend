import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

 function Dashboard() {
  return (
    <div>
      <h2 className="mb-4">Panel de administración</h2>
      <Row className="g-3">
        <Col md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Proyectos</Card.Title>
              <Card.Text>Gestiona proyectos (crear, editar, eliminar).</Card.Text>
              <Button as={Link} to="/admin/proyectos" variant="primary">Ir a Proyectos</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Artículos</Card.Title>
              <Card.Text>Gestiona artículos (crear, editar, eliminar).</Card.Text>
              <Button as={Link} to="/admin/articulos" variant="primary">Ir a Artículos</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Usuarios</Card.Title>
              <Card.Text>Gestiona usuarios y roles.</Card.Text>
              <Button as={Link} to="/admin/usuarios" variant="primary">Ir a Usuarios</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default Dashboard;