import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Badge, Button, Carousel, Alert, Card, Form, Spinner } from "react-bootstrap";
import { obtenerProyectoPorId } from "../services/ProyectosService";
import { listarComentarios, crearComentario } from "../services/ComentariosService";
import { confirmComentar, alertComentarioPublicado, alertError } from "../assets/js";
import { assetUrl } from "../lib/assetUrl";
import ProjectSkeletonGrid from "../components/ProjectSkeletonGrid";
import RevealOnScroll from "../components/RevealOnScroll";

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
      <div className="section-white">
        <Container>
          <ProjectSkeletonGrid count={2} />
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <Link to="/proyectos" className="btn btn-outline-secondary btn-sm">
          ← Volver a proyectos
        </Link>
      </Container>
    );
  }

  if (!item) {
    return (
      <Container className="py-5">
        <Alert variant="secondary">Proyecto no encontrado.</Alert>
        <Link to="/proyectos" className="btn btn-outline-secondary btn-sm">
          ← Volver a proyectos
        </Link>
      </Container>
    );
  }

  const images = (item.imagenes || []).map((img) => ({ ...img, src: assetUrl(img.url) }));

  return (
    <>
      {/* Header */}
      <div className="page-header">
        <Container>
          <RevealOnScroll>
            <Link
              to="/proyectos"
              className="text-secondary small mb-3 d-inline-block text-decoration-none"
              style={{ letterSpacing: "0.01em" }}
            >
              ← Volver a proyectos
            </Link>
            <h1 className="section-title mb-2">{item.titulo}</h1>
            <div className="d-flex gap-2">
              {item.github && <Badge bg="dark">Repo</Badge>}
              {item.demoUrl && <Badge bg="primary">Demo</Badge>}
            </div>
          </RevealOnScroll>
        </Container>
      </div>

      {/* Cuerpo principal */}
      <div className="section-white">
        <Container>
          <Row className="g-4">
            <Col lg={7}>
              <RevealOnScroll>
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
                  <div
                    className="card-pro d-flex align-items-center justify-content-center text-secondary"
                    style={{ height: "180px", cursor: "default" }}
                  >
                    Este proyecto aún no tiene imágenes.
                  </div>
                )}
              </RevealOnScroll>
            </Col>

            <Col lg={5}>
              <RevealOnScroll delay={0.1}>
                <Card className="card-pro h-100" style={{ cursor: "default" }}>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>Descripción</Card.Title>
                    <Card.Text className="text-secondary pre-wrap">
                      {item.descripcion || "Sin descripción"}
                    </Card.Text>
                    <div className="mt-auto d-flex gap-2">
                      {item.github && (
                        <Button
                          as="a"
                          href={item.github}
                          target="_blank"
                          rel="noreferrer"
                          variant="dark"
                        >
                          Ver en GitHub
                        </Button>
                      )}
                      {item.demoUrl && (
                        <Button
                          as="a"
                          href={item.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          variant="primary"
                        >
                          Ver Demo
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </RevealOnScroll>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Comentarios */}
      <div className="section-soft">
        <Container>
          <RevealOnScroll>
            <h4 className="mb-3">Comentarios</h4>
            {comentarios.length === 0 ? (
              <Alert variant="secondary">Sé el primero en comentar.</Alert>
            ) : (
              comentarios.map((c) => (
                <Card key={c.id} className="mb-2">
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      <div>
                        <strong>{c.autor?.nombre || "Usuario"}</strong>
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

            {localStorage.getItem("token") ? (
              <Card className="mt-3">
                <Card.Body>
                  <Form
                    onSubmit={async (e) => {
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
                        await alertError(
                          err?.response?.data?.error || "No se pudo publicar el comentario"
                        );
                      } finally {
                        setPosting(false);
                      }
                    }}
                  >
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
                      <Button
                        type="submit"
                        disabled={posting || !nuevoComentario.trim()}
                      >
                        {posting ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Publicando…
                          </>
                        ) : (
                          "Publicar comentario"
                        )}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            ) : (
              <Alert variant="light" className="mt-3">
                Inicia sesión para comentar.
              </Alert>
            )}
          </RevealOnScroll>
        </Container>
      </div>
    </>
  );
}

export default ProyectoDetalle;
