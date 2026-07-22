import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { alertComentarioPublicado, alertError, confirmComentar } from "../assets/js";
import ProjectSkeletonGrid from "../components/ProjectSkeletonGrid";
import RevealOnScroll from "../components/RevealOnScroll";
import { assetUrl, cloudinaryTransform } from "../lib/assetUrl";
import { getStoredToken } from "../lib/authStorage";
import { projectCategory, projectTechnologies, validExternalUrl } from "../lib/projects";
import profile from "../profile.config";
import { crearComentario, listarComentarios } from "../services/ComentariosService";
import { obtenerProyectoPorId } from "../services/ProyectosService";

const optionalSections = [
  { title: "Problema", fields: ["problema", "problem"] },
  { title: "Objetivo", fields: ["objetivo", "objective"] },
  { title: "Usuarios y roles", fields: ["usuarios", "roles", "users"] },
  { title: "Funcionalidades principales", fields: ["funcionalidades", "features"] },
  { title: "Arquitectura", fields: ["arquitectura", "architecture"] },
  { title: "Mi participación", fields: ["participacion", "responsabilidades", "myRole"] },
  { title: "Retos técnicos", fields: ["retos", "challenges"] },
  { title: "Soluciones aplicadas", fields: ["soluciones", "solutions"] },
  { title: "Mejoras futuras", fields: ["mejorasFuturas", "futureImprovements"] },
];

function firstAvailable(item, fields) {
  return fields.map((field) => item?.[field]).find((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return typeof value === "string" ? value.trim() : Boolean(value);
  });
}

function DetailValue({ value }) {
  if (Array.isArray(value)) {
    return <ul>{value.filter(Boolean).map((entry) => <li key={String(entry)}>{String(entry)}</li>)}</ul>;
  }
  return <p className="mb-0 pre-wrap">{String(value)}</p>;
}

function ProyectoDetalle() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [commentsError, setCommentsError] = useState("");
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      setLoading(true);
      setError("");
      setCommentsError("");
      const [projectResult, commentsResult] = await Promise.allSettled([
        obtenerProyectoPorId(id, { signal: controller.signal }),
        listarComentarios(id, { signal: controller.signal }),
      ]);

      if (controller.signal.aborted) return;
      if (projectResult.status === "rejected") {
        const requestError = projectResult.reason;
        setError(
          requestError?.response?.status === 404
            ? "Proyecto no encontrado."
            : requestError?.response?.data?.error || "No fue posible cargar el proyecto."
        );
        setItem(null);
      } else {
        setItem(projectResult.value);
      }

      if (commentsResult.status === "fulfilled") {
        setComentarios(Array.isArray(commentsResult.value) ? commentsResult.value : []);
      } else if (commentsResult.reason?.code !== "ERR_CANCELED") {
        setCommentsError("Los comentarios no están disponibles en este momento.");
      }
      setLoading(false);
    };

    run();
    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    if (!item?.titulo) return;
    const title = `${item.titulo} | Proyecto de ${profile.displayName}`;
    document.title = title;
    document.head.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
  }, [item]);

  if (loading) {
    return (
      <section className="section-white" aria-label="Cargando detalle del proyecto">
        <Container><ProjectSkeletonGrid count={2} /></Container>
      </section>
    );
  }

  if (error || !item) {
    return (
      <Container className="empty-page-state">
        <Alert variant={error === "Proyecto no encontrado." ? "secondary" : "danger"}>
          {error || "Proyecto no encontrado."}
        </Alert>
        <Button as={Link} to="/proyectos" variant="outline-secondary" size="sm">← Volver a proyectos</Button>
      </Container>
    );
  }

  const rawImages = item.imagenes?.length ? item.imagenes : item.imagen ? [{ id: "principal", url: item.imagen }] : [];
  const images = rawImages
    .map((image) => ({ ...image, src: cloudinaryTransform(assetUrl(image.url), "w_1200,c_limit,q_auto:good,f_auto") }))
    .filter((image) => image.src);
  const technologies = projectTechnologies(item);
  const github = validExternalUrl(item.github);
  const demo = validExternalUrl(item.demoUrl);
  const status = item.estado || item.status;
  const caseStudySections = optionalSections
    .map((section) => ({ ...section, value: firstAvailable(item, section.fields) }))
    .filter((section) => section.value);

  const submitComment = async (event) => {
    event.preventDefault();
    const content = nuevoComentario.trim();
    if (!content || posting) return;
    const confirmed = await confirmComentar();
    if (!confirmed) return;
    setPosting(true);
    try {
      await crearComentario(id, content);
      const updatedComments = await listarComentarios(id);
      setComentarios(Array.isArray(updatedComments) ? updatedComments : []);
      setNuevoComentario("");
      await alertComentarioPublicado();
    } catch (requestError) {
      await alertError(requestError?.response?.data?.error || "No se pudo publicar el comentario");
    } finally {
      setPosting(false);
    }
  };

  return (
    <>
      <header className="page-header project-detail-header">
        <Container>
          <RevealOnScroll>
            <Link to="/proyectos" className="back-link">← Volver a proyectos</Link>
            <div className="d-flex flex-wrap gap-2 mb-3">
              <Badge bg="light" text="dark" className="project-category">{projectCategory(item)}</Badge>
              {status && <Badge bg="secondary">{status}</Badge>}
            </div>
            <h1 className="section-title mb-3">{item.titulo || "Proyecto sin título"}</h1>
            {technologies.length > 0 && (
              <ul className="project-tech-list project-tech-list--header" aria-label="Tecnologías del proyecto">
                {technologies.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
            )}
          </RevealOnScroll>
        </Container>
      </header>

      <section className="section-white" aria-labelledby="project-description-title">
        <Container>
          <Row className="g-4 align-items-stretch">
            <Col lg={7}>
              <RevealOnScroll className="h-100">
                {images.length > 0 ? (
                  <Carousel variant="dark" className="project-carousel">
                    {images.map((image, index) => (
                      <Carousel.Item key={image.id || image.url}>
                        <img
                          src={image.src}
                          alt={`Captura ${index + 1} del proyecto ${item.titulo}`}
                          className="d-block w-100 img-contain-420"
                          loading={index === 0 ? "eager" : "lazy"}
                          decoding="async"
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : (
                  <div className="project-image-empty">Este proyecto aún no tiene imágenes.</div>
                )}
              </RevealOnScroll>
            </Col>
            <Col lg={5}>
              <RevealOnScroll delay={0.08} className="h-100">
                <Card className="card-pro project-summary h-100">
                  <Card.Body className="d-flex flex-column">
                    <h2 id="project-description-title" className="h4">Descripción</h2>
                    <p className="text-secondary pre-wrap">{item.descripcion || "Este proyecto aún no tiene una descripción publicada."}</p>
                    {(github || demo) && (
                      <div className="mt-auto d-flex flex-wrap gap-2 pt-3">
                        {github && <Button as="a" href={github} target="_blank" rel="noopener noreferrer" variant="dark">Ver código</Button>}
                        {demo && <Button as="a" href={demo} target="_blank" rel="noopener noreferrer" variant="primary">Ver aplicación</Button>}
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </RevealOnScroll>
            </Col>
          </Row>

          {caseStudySections.length > 0 && (
            <div className="case-study-grid">
              {caseStudySections.map((section) => (
                <section key={section.title} className="case-study-section">
                  <h2>{section.title}</h2>
                  <DetailValue value={section.value} />
                </section>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="section-soft" aria-labelledby="comments-title">
        <Container className="content-narrow">
          <RevealOnScroll>
            <h2 id="comments-title" className="section-title mb-4">Comentarios</h2>
            {commentsError && <Alert variant="warning">{commentsError}</Alert>}
            {!commentsError && comentarios.length === 0 && <Alert variant="secondary">Sé el primero en comentar.</Alert>}
            {comentarios.map((comment) => (
              <Card key={comment.id} className="comment-card mb-3">
                <Card.Body>
                  <strong>{comment.autor?.nombre || "Usuario"}</strong>
                  {comment.createdAt && (
                    <time className="comment-date" dateTime={comment.createdAt}>
                      {new Date(comment.createdAt).toLocaleString("es-CO")}
                    </time>
                  )}
                  <p className="mt-2 mb-0 pre-wrap">{comment.contenido}</p>
                </Card.Body>
              </Card>
            ))}

            {getStoredToken() ? (
              <Card className="comment-form mt-4">
                <Card.Body>
                  <Form onSubmit={submitComment}>
                    <Form.Group controlId="project-comment">
                      <Form.Label>Deja tu comentario</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        maxLength={1000}
                        required
                        value={nuevoComentario}
                        onChange={(event) => setNuevoComentario(event.target.value)}
                        placeholder="Escribe aquí…"
                      />
                      <Form.Text muted>{nuevoComentario.length}/1000 caracteres.</Form.Text>
                    </Form.Group>
                    <Button className="mt-3" type="submit" disabled={posting || !nuevoComentario.trim()}>
                      {posting ? <><Spinner animation="border" size="sm" className="me-2" />Publicando…</> : "Publicar comentario"}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            ) : (
              <Alert variant="light" className="mt-4">
                <Link to="/login">Inicia sesión</Link> para comentar.
              </Alert>
            )}
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}

export default ProyectoDetalle;
