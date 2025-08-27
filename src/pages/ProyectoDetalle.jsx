import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Badge, Button, Carousel, Spinner, Alert, Card, Form } from "react-bootstrap";
import { obtenerProyectoPorId } from "../services/ProyectosService";
import { listarComentarios, crearComentario } from "../services/ComentariosService";
import { confirmComentar, alertComentarioPublicado, alertError } from "../assets/js";
import { assetUrl } from "../lib/assetUrl";

function ProyectoDetalle() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [posting, setPosting] = useState(false);


  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await obtenerProyectoPorId(id);
        setItem(data);
  const coms = await listarComentarios(id);
  setComentarios(Array.isArray(coms) ? coms : []);
      } catch (e) {
        setError(e?.response?.data?.error || "No se pudo cargar el proyecto");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-4"><Spinner animation="border" size="sm"/> Cargando…</Container>
    );
  }
  if (error) {
    return (
      <Container className="py-4"><Alert variant="danger">{error}</Alert></Container>
    );
  }
  if (!item) {
    return (
      <Container className="py-4"><Alert variant="secondary">Proyecto no encontrado.</Alert></Container>
    );
  }

  const images = (item.imagenes || []).map((img) => ({ ...img, src: assetUrl(img.url) }));

  return (
    <>
      <div className="bg-light py-4 border-bottom">
        <Container>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h1 className="mb-1">{item.titulo}</h1>
              <div className="d-flex gap-2">
                {item.github && <Badge bg="dark">Repo</Badge>}
                {item.demoUrl && <Badge bg="primary">Demo</Badge>}
              </div>
            </div>
            <Button as={Link} to="/proyectos" variant="outline-secondary">Volver</Button>
          </div>
        </Container>
      </div>

      <Container className="py-4">
        <Row className="g-4">
          <Col lg={7}>
            {images.length > 0 ? (
              <Carousel variant="dark">
                {images.map((img) => (
                  <Carousel.Item key={img.id}>
                    <img
                      src={img.src}
                      alt={item.titulo}
                      className="d-block w-100 img-contain-420"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <Card className="shadow-sm"><Card.Body className="text-secondary">Este proyecto aún no tiene imágenes.</Card.Body></Card>
            )}
          </Col>
          <Col lg={5}>
            <Card className="shadow-sm h-100">
              <Card.Body className="d-flex flex-column">
                <Card.Title>Descripción</Card.Title>
                <Card.Text className="text-secondary pre-wrap">{item.descripcion || 'Sin descripción'}</Card.Text>
                <div className="mt-auto d-flex gap-2">
                  {item.github && <Button as="a" href={item.github} target="_blank" rel="noreferrer" variant="dark">Ver en GitHub</Button>}
                  {item.demoUrl && <Button as="a" href={item.demoUrl} target="_blank" rel="noreferrer" variant="primary">Ver Demo</Button>}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* Comentarios */}
        <Row className="g-4 mt-2">
          <Col lg={12}>
            <h4 className="mb-3">Comentarios</h4>
            {comentarios.length === 0 ? (
              <Alert variant="secondary">Sé el primero en comentar.</Alert>
            ) : (
              comentarios.map((c) => (
                <Card key={c.id} className="mb-2">
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      <div>
                        <strong>{c.autor?.nombre || 'Usuario'}</strong>
                        <div className="text-secondary fs-12">
                          {new Date(c.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 pre-wrap">{c.contenido}</div>
                  </Card.Body>
                </Card>
              ))
            )}
            {localStorage.getItem('token') ? (
              <Card className="mt-3">
                <Card.Body>
                  <Form onSubmit={async (e) => {
                    e.preventDefault();
                    const contenido = nuevoComentario.trim();
                    if (!contenido) return;
                    const ok = await confirmComentar();
                    if (!ok) return;
                    setPosting(true);
                    try {
                      await crearComentario(id, contenido);
                      const coms = await listarComentarios(id);
                      setComentarios(Array.isArray(coms) ? coms : []);
                      setNuevoComentario("");
                      await alertComentarioPublicado();
                    } catch (err) {
                      await alertError(err?.response?.data?.error || 'No se pudo publicar el comentario');
                    } finally {
                      setPosting(false);
                    }
                  }}>
                    <Form.Group>
                      <Form.Label>Deja tu comentario</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        maxLength={1000}
                        value={nuevoComentario}
                        onChange={(e) => setNuevoComentario(e.target.value)}
                        placeholder="Escribe aquí..."
                      />
                      <Form.Text muted>Hasta 1000 caracteres.</Form.Text>
                    </Form.Group>
                    <div className="mt-2">
                      <Button type="submit" disabled={posting || !nuevoComentario.trim()}>
                        {posting ? 'Publicando…' : 'Publicar comentario'}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            ) : (
              <Alert variant="light" className="mt-3">Inicia sesión para comentar.</Alert>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default ProyectoDetalle;