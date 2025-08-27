import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { iniciarSesion } from "../services/Loginservice";
import { alertLoginSuccess } from "../assets/js";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    if (token && user) {
      navigate(user.rol === "admin" ? "/admin" : "/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true);
    setError("");
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }
    try {
      setLoading(true);
      const { token, user } = await iniciarSesion({ email, password });
      if (!token) throw new Error("Sin token en la respuesta");
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      alertLoginSuccess(user);
      navigate(user?.rol === "admin" ? "/admin" : "/");
    } catch (err) {
      const status = err?.response?.status;
      const msg =
        err?.response?.data?.error ||
        (status === 401 || status === 400
          ? "Credenciales inválidas"
          : err.message) ||
        "Error al iniciar sesión";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100 bg-light"
    >
  <Row className="w-100 justify-content-center px-2 px-sm-3 mx-0">
        <Col
          xs={12}
          sm={10}
          md={8}
          lg={6}
          xl={5}
          xxl={4}
          className="max-w-560"
        >
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Body className="p-5">
              <h2 className="text-center mb-4 fw-bold">🔐 Iniciar Sesión</h2>
              <p className="text-center text-muted mb-4">
                Bienvenido de nuevo, ingresa tus credenciales
              </p>

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="ejemplo@correo.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingresa un correo válido.
                  </Form.Control.Feedback>
                </Form.Group>

                {/* PASSWORD */}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="d-flex align-items-center min-w-3rem"
                    >
                      {showPassword ? <EyeSlash /> : <Eye />}
                    </Button>
                    <Form.Control.Feedback type="invalid">
                      La contraseña es obligatoria.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Recordarme" />
                </Form.Group>

                {error && <Alert variant="danger">{error}</Alert>}
                <div className="d-grid mb-3">
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner size="sm" animation="border" />
                    ) : (
                      "Entrar"
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <a href="/forgot-password" className="text-decoration-none">
                    ¿Olvidaste tu contraseña?
                  </a>
                  <br />
                  <span className="text-muted">¿No tienes cuenta?</span>{" "}
                  <a
                    href="/registrar"
                    className="fw-semibold text-primary text-decoration-none"
                  >
                    Regístrate
                  </a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
