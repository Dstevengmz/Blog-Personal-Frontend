import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, InputGroup } from "react-bootstrap";
import { registrarUsuario } from "../services/Registrarservice";

function Registrar() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await registrarUsuario({ nombre, email, password });
      setSuccess("Usuario registrado exitosamente");
      setNombre("");
      setEmail("");
      setPassword("");
    } catch (err) {
      const status = err?.response?.status;
      const msg = err?.response?.data?.error || (status === 409 ? "Email ya registrado" : err?.message) || "Error al registrar";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={5} style={{ maxWidth: 560 }}>
          <Card className="shadow-sm border-0 rounded-3">
            <Card.Body className="p-4">
              <h3 className="text-center mb-4">Crear cuenta</h3>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="regNombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="regEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ejemplo@correo.com" required autoComplete="email" />
                </Form.Group>
                <Form.Group className="mb-4" controlId="regPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <InputGroup>
                    <Form.Control type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" required autoComplete="new-password" />
                    <Button variant="outline-secondary" type="button" onClick={() => setShowPassword((v) => !v)}>
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </Button>
                  </InputGroup>
                </Form.Group>
                <div className="d-grid">
                  <Button type="submit" disabled={loading}>
                    {loading ? <Spinner size="sm" animation="border" /> : "Registrarme"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default Registrar;