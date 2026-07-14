import { useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { solicitarRecuperacion } from "../services/Loginservice";

function RecuperarContrasena() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;
    setError("");
    setSuccess("");

    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Escribe un correo electrónico válido.");
      return;
    }

    setLoading(true);
    try {
      const response = await solicitarRecuperacion(normalizedEmail);
      setSuccess(response?.mensaje || "Si el correo está registrado, recibirás un enlace de recuperación.");
      setEmail("");
    } catch (requestError) {
      setError(requestError?.response?.data?.error || "No fue posible procesar la solicitud. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="auth-page">
      <Row className="w-100 justify-content-center px-2 mx-0">
        <Col xs={12} sm={10} md={7} lg={5} className="max-w-560">
          <Card className="auth-card">
            <Card.Body className="p-4 p-md-5">
              <p className="section-kicker text-center">Acceso</p>
              <h1 className="h2 text-center fw-bold">Recuperar contraseña</h1>
              <p className="text-secondary text-center mb-4">
                Escribe el correo asociado con tu cuenta. Si está registrado, recibirás un enlace válido durante 30 minutos.
              </p>

              <div aria-live="polite">
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
              </div>

              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group controlId="recovery-email">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    disabled={loading}
                  />
                </Form.Group>
                <div className="d-grid mt-4">
                  <Button type="submit" size="lg" disabled={loading}>
                    {loading ? <><Spinner size="sm" animation="border" className="me-2" />Enviando…</> : "Enviar enlace"}
                  </Button>
                </div>
              </Form>

              <p className="text-center mt-4 mb-0">
                <Link to="/login">← Volver a iniciar sesión</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RecuperarContrasena;
