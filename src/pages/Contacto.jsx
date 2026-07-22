import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import RevealOnScroll from "../components/RevealOnScroll";
import profile from "../profile.config";
import { enviarContacto } from "../services/ContactoService";

const initialForm = { nombre: "", email: "", asunto: "", mensaje: "", website: "" };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.nombre.trim()) errors.nombre = "Escribe tu nombre.";
  else if (values.nombre.trim().length < 2) errors.nombre = "El nombre debe tener al menos 2 caracteres.";
  if (!values.email.trim()) errors.email = "Escribe tu correo electrónico.";
  else if (!emailPattern.test(values.email.trim())) errors.email = "Escribe un correo electrónico válido.";
  if (!values.mensaje.trim()) errors.mensaje = "Escribe un mensaje.";
  else if (values.mensaje.trim().length < 10) errors.mensaje = "El mensaje debe tener al menos 10 caracteres.";
  return errors;
}

function Contacto() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");

  const updateField = (field, value) => {
    const nextForm = { ...form, [field]: value };
    setForm(nextForm);
    setSuccess("");
    if (touched[field]) setErrors(validate(nextForm));
  };

  const touchField = (field) => {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors(validate(form));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (sending) return;
    const validationErrors = validate(form);
    setTouched({ nombre: true, email: true, mensaje: true });
    setErrors(validationErrors);
    setSuccess("");
    setServerError("");
    if (Object.keys(validationErrors).length > 0) return;
    if (form.website) {
      setServerError("No fue posible enviar el mensaje.");
      return;
    }

    setSending(true);
    try {
      await enviarContacto({
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        asunto: form.asunto.trim(),
        mensaje: form.mensaje.trim(),
      });
      setSuccess("Tu mensaje fue enviado correctamente. Te responderé tan pronto como sea posible.");
      setForm(initialForm);
      setTouched({});
      setErrors({});
    } catch (requestError) {
      setServerError(requestError?.response?.data?.error || "No fue posible enviar el mensaje. Inténtalo de nuevo o escríbeme por correo.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <header className="page-header">
        <Container>
          <RevealOnScroll>
            <p className="section-kicker">Contacto</p>
            <h1 className="section-title mb-2">Conversemos sobre una oportunidad</h1>
            <p className="section-copy mb-0">
              Estoy disponible para oportunidades como Desarrollador de Software Junior, Full Stack Junior o Backend Junior. Conversemos sobre la vacante, el producto o el reto técnico de tu equipo.
            </p>
          </RevealOnScroll>
        </Container>
      </header>

      <section className="section-white">
        <Container>
          <Row className="gy-5 gx-lg-5 align-items-start">
            <Col lg={7}>
              <RevealOnScroll>
                <div className="card-pro contact-card p-4 p-md-5">
                  <h2 className="h4 mb-4">Enviar un mensaje</h2>
                  <div aria-live="polite">
                    {success && <Alert variant="success" role="status">{success}</Alert>}
                    {serverError && <Alert variant="danger" role="alert">{serverError}</Alert>}
                  </div>

                  <Form onSubmit={onSubmit} noValidate>
                    <Row className="g-4">
                      <Col md={6}>
                        <Form.Group controlId="contact-name">
                          <Form.Label>Nombre <span aria-hidden="true">*</span></Form.Label>
                          <Form.Control
                            required
                            autoComplete="name"
                            value={form.nombre}
                            maxLength={80}
                            onChange={(event) => updateField("nombre", event.target.value)}
                            onBlur={() => touchField("nombre")}
                            isInvalid={Boolean(touched.nombre && errors.nombre)}
                            aria-describedby={errors.nombre ? "contact-name-error" : undefined}
                          />
                          <Form.Control.Feedback id="contact-name-error" type="invalid">{errors.nombre}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="contact-email">
                          <Form.Label>Correo electrónico <span aria-hidden="true">*</span></Form.Label>
                          <Form.Control
                            type="email"
                            required
                            autoComplete="email"
                            inputMode="email"
                            value={form.email}
                            maxLength={160}
                            onChange={(event) => updateField("email", event.target.value)}
                            onBlur={() => touchField("email")}
                            isInvalid={Boolean(touched.email && errors.email)}
                            aria-describedby={errors.email ? "contact-email-error" : "contact-email-help"}
                          />
                          <Form.Text id="contact-email-help" muted>Usaré este correo únicamente para responderte.</Form.Text>
                          <Form.Control.Feedback id="contact-email-error" type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group controlId="contact-subject">
                          <Form.Label>Asunto <span className="text-secondary">(opcional)</span></Form.Label>
                          <Form.Control
                            value={form.asunto}
                            maxLength={120}
                            onChange={(event) => updateField("asunto", event.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group controlId="contact-message">
                          <Form.Label>Mensaje <span aria-hidden="true">*</span></Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={6}
                            required
                            value={form.mensaje}
                            onChange={(event) => updateField("mensaje", event.target.value)}
                            onBlur={() => touchField("mensaje")}
                            maxLength={2000}
                            isInvalid={Boolean(touched.mensaje && errors.mensaje)}
                            aria-describedby={errors.mensaje ? "contact-message-error" : "contact-message-count"}
                          />
                          <div className="d-flex justify-content-between">
                            <Form.Text id="contact-message-count" muted>Mínimo 10 caracteres.</Form.Text>
                            <Form.Text muted>{form.mensaje.length}/2000</Form.Text>
                          </div>
                          <Form.Control.Feedback id="contact-message-error" type="invalid">{errors.mensaje}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <div className="contact-honeypot" aria-hidden="true">
                        <label htmlFor="contact-website">Sitio web</label>
                        <input id="contact-website" name="website" tabIndex="-1" autoComplete="off" value={form.website} onChange={(event) => updateField("website", event.target.value)} />
                      </div>
                    </Row>
                    <Button type="submit" variant="primary" className="mt-4" disabled={sending}>
                      {sending ? <><Spinner animation="border" size="sm" className="me-2" aria-hidden="true" />Enviando…</> : "Enviar mensaje"}
                    </Button>
                  </Form>
                </div>
              </RevealOnScroll>
            </Col>

            <Col lg={5}>
              <RevealOnScroll delay={0.1}>
                <aside className="contact-sidebar" aria-labelledby="direct-contact-title">
                  <h2 id="direct-contact-title" className="h4 mb-3">Contacto directo</h2>
                  <p className="text-secondary mb-4">También puedes encontrarme en mis perfiles profesionales o escribirme por correo.</p>
                  <dl className="contact-list">
                    <div><dt>Correo</dt><dd><a href={`mailto:${profile.email}`}>{profile.email}</a></dd></div>
                    <div><dt>GitHub</dt><dd><a href={profile.github} target="_blank" rel="noopener noreferrer">github.com/dstevengmz<span className="visually-hidden"> (abre en una pestaña nueva)</span></a></dd></div>
                    <div><dt>LinkedIn</dt><dd><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/dstevengmz<span className="visually-hidden"> (abre en una pestaña nueva)</span></a></dd></div>
                    <div><dt>Ubicación</dt><dd>{profile.location}</dd></div>
                  </dl>
                </aside>
              </RevealOnScroll>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Contacto;
