import { useState } from "react";
import { Alert, Button, Card, Col, Container, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { Link, useParams } from "react-router-dom";
import { restablecerContrasena } from "../services/Loginservice";

function RestablecerContrasena() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading || success) return;
    setError("");
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== confirmation) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      const response = await restablecerContrasena(token, password);
      setSuccess(response?.mensaje || "Contraseña actualizada correctamente.");
      setPassword("");
      setConfirmation("");
    } catch (requestError) {
      setError(requestError?.response?.data?.error || "El enlace no es válido o ya venció.");
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
              <p className="section-kicker text-center">Seguridad</p>
              <h1 className="h2 text-center fw-bold">Crear contraseña nueva</h1>
              <p className="text-secondary text-center mb-4">
                Utiliza al menos 8 caracteres. El enlace dejará de funcionar después de guardar la nueva contraseña.
              </p>

              <div aria-live="polite">
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
              </div>

              {!success && (
                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group className="mb-3" controlId="reset-password">
                    <Form.Label>Nueva contraseña</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        minLength={8}
                        maxLength={128}
                        required
                      />
                      <Button
                        type="button"
                        variant="outline-secondary"
                        onClick={() => setShowPassword((current) => !current)}
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        {showPassword ? <EyeSlash aria-hidden="true" /> : <Eye aria-hidden="true" />}
                      </Button>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group controlId="reset-password-confirmation">
                    <Form.Label>Confirmar contraseña</Form.Label>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={confirmation}
                      onChange={(event) => setConfirmation(event.target.value)}
                      minLength={8}
                      maxLength={128}
                      required
                    />
                  </Form.Group>
                  <div className="d-grid mt-4">
                    <Button type="submit" size="lg" disabled={loading}>
                      {loading ? <><Spinner size="sm" animation="border" className="me-2" />Guardando…</> : "Guardar contraseña"}
                    </Button>
                  </div>
                </Form>
              )}

              <p className="text-center mt-4 mb-0">
                <Link to="/login">Volver a iniciar sesión</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RestablecerContrasena;
