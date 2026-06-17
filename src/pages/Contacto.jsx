import { useRef, useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";
import { enviarContacto } from "../services/ContactoService";
import RevealOnScroll from "../components/RevealOnScroll";
import profile from "../profile.config";

function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const trapRef = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSuccess("");
    setError("");
    try {
      if (trapRef.current?.value) {
        setError("No se pudo enviar el mensaje");
        setSending(false);
        return;
      }
      await enviarContacto(form);
      setSuccess("¡Tu mensaje ha sido enviado! Te responderé pronto.");
      setForm({ nombre: "", email: "", asunto: "", mensaje: "" });
    } catch (err) {
      setError(err?.response?.data?.error || "No se pudo enviar el mensaje");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <Container>
          <RevealOnScroll>
            <h1 className="section-title mb-2">Hablemos</h1>
            <p className="section-subtitle mb-0">
              ¿Tienes una idea, propuesta o proyecto en mente? Escríbeme y conversemos.
            </p>
          </RevealOnScroll>
        </Container>
      </div>

      <div className="section-white">
        <Container>
          <Row className="gy-4 gx-5 align-items-start">

            {/* Formulario */}
            <Col lg={7}>
              <RevealOnScroll>
              <div className="card-pro contact-card p-4">
                {success && <Alert variant="success" className="mb-3">{success}</Alert>}
                {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

                <Form onSubmit={onSubmit} noValidate>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>
                          Nombre <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          value={form.nombre}
                          maxLength={80}
                          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                          placeholder="Tu nombre"
                        />
                        <Form.Text muted>Máx 80 caracteres.</Form.Text>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>
                          Email <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="tu@correo.com"
                          inputMode="email"
                        />
                        <Form.Text muted>Usaré este correo para responderte.</Form.Text>
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <Form.Group>
                        <Form.Label>Asunto</Form.Label>
                        <Form.Control
                          value={form.asunto}
                          maxLength={120}
                          onChange={(e) => setForm({ ...form, asunto: e.target.value })}
                          placeholder="Motivo del mensaje"
                        />
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <Form.Group>
                        <Form.Label>
                          Mensaje <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          required
                          value={form.mensaje}
                          onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                          placeholder="Cuéntame brevemente tu idea, proyecto o consulta."
                          maxLength={2000}
                        />
                        <div className="d-flex justify-content-between">
                          <Form.Text muted>Hasta 2000 caracteres.</Form.Text>
                          <Form.Text muted>{form.mensaje.length}/2000</Form.Text>
                        </div>
                      </Form.Group>
                    </Col>

                    {/* Honeypot antispam — no modificar */}
                    <Col md={12} className="d-none" aria-hidden="true">
                      <Form.Group>
                        <Form.Label>Deja este campo vacío</Form.Label>
                        <Form.Control ref={trapRef} tabIndex={-1} autoComplete="off" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex gap-2 mt-4 align-items-center">
                    <Button type="submit" variant="primary" disabled={sending}>
                      {sending ? (
                        <><Spinner animation="border" size="sm" className="me-2" />Enviando…</>
                      ) : "Enviar mensaje"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => setForm({ nombre: "", email: "", asunto: "", mensaje: "" })}
                      disabled={sending}
                    >
                      Limpiar
                    </Button>
                  </div>
                </Form>
              </div>
              </RevealOnScroll>
            </Col>

            {/* Información de contacto */}
            <Col lg={5}>
              <RevealOnScroll delay={0.15}>
              <div className="contact-sidebar">
                <h2 className="fw-semibold fs-5 mb-2">Información de contacto</h2>
                <p className="text-secondary mb-4" style={{ fontSize: "0.92rem" }}>
                  Disponible para proyectos freelance, colaboraciones y oportunidades laborales.
                </p>

                <ul className="list-unstyled contact-sidebar__list">
                  <li>
                    <span className="contact-sidebar__label">Email</span>
                    <a href={`mailto:${profile.email}`} className="contact-sidebar__link">
                      {profile.email}
                    </a>
                  </li>
                  <li>
                    <span className="contact-sidebar__label">GitHub</span>
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-sidebar__link"
                    >
                      {profile.github.replace("https://", "")}
                    </a>
                  </li>
                  <li>
                    <span className="contact-sidebar__label">LinkedIn</span>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-sidebar__link"
                    >
                      {profile.linkedin.replace("https://www.", "")}
                    </a>
                  </li>
                  <li>
                    <span className="contact-sidebar__label">Ubicación</span>
                    <span className="text-secondary" style={{ fontSize: "0.9rem" }}>
                      {profile.location}
                    </span>
                  </li>
                </ul>
              </div>
              </RevealOnScroll>
            </Col>

          </Row>
        </Container>
      </div>
    </>
  );
}

export default Contacto;
