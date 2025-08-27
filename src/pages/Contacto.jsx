import { useRef, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { enviarContacto } from "../services/ContactoService";

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
    <div className="bg-light py-5 flex-grow-1 d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="shadow-sm">
              <Card.Body>
                <h2 className="mb-3">Contacto</h2>
                <p className="text-secondary">¿Tienes una idea o propuesta? Escríbeme y conversemos.</p>
                {success && <Alert variant="success">{success}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={onSubmit} noValidate>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                          required
                          value={form.nombre}
                          maxLength={80}
                          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                          placeholder="Tu nombre"
                          autoFocus
                        />
                        <Form.Text muted>Máx 80 caracteres.</Form.Text>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
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
                        <Form.Label>Asunto </Form.Label>
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
                        <Form.Label>Mensaje</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          required
                          value={form.mensaje}
                          onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                          placeholder="Cuéntame brevemente tu idea, proyecto o consulta."
                          maxLength={2000}
                        />
                        <Form.Text muted>Hasta 2000 caracteres.</Form.Text>
                      </Form.Group>
                    </Col>
                    <Col md={12} className="d-none" aria-hidden="true">
                      <Form.Group>
                        <Form.Label>Deja este campo vacío</Form.Label>
                        <Form.Control ref={trapRef} tabIndex={-1} autoComplete="off" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-flex gap-2 mt-3">
                    <Button type="submit" variant="primary" disabled={sending}>
                      {sending ? (<><Spinner animation="border" size="sm" className="me-2"/> Enviando…</>) : 'Enviar mensaje'}
                    </Button>
                    <Button type="button" variant="outline-secondary" onClick={() => setForm({ nombre: "", email: "", asunto: "", mensaje: "" })} disabled={sending}>
                      Limpiar
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Contacto;