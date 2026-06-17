import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Badge, Alert, Spinner } from "react-bootstrap";
import { obtenerArticuloPorId } from "../services/ArticulosService";
import { assetUrl } from "../lib/assetUrl";
import RevealOnScroll from "../components/RevealOnScroll";

function ArticuloDetalle() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await obtenerArticuloPorId(id);
        setItem(data);
      } catch (e) {
        if (e?.response?.status === 404) {
          setItem(null);
          setError("404");
        } else {
          setError(e?.response?.data?.error || "No se pudo cargar el artículo");
        }
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" size="sm" className="me-2" />
        Cargando artículo…
      </Container>
    );
  }

  if (error === "404" || (!loading && !error && !item)) {
    return (
      <Container className="py-5">
        <Alert variant="secondary">Artículo no encontrado.</Alert>
        <Link to="/articulos" className="btn btn-outline-secondary btn-sm">
          ← Volver a artículos
        </Link>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <Link to="/articulos" className="btn btn-outline-secondary btn-sm">
          ← Volver a artículos
        </Link>
      </Container>
    );
  }

  const stripTags = (str) => (str ? str.replace(/<[^>]+>/g, "") : "");
  const imgSrc = assetUrl(item.imagen || item.imagenes?.[0]?.url);
  const fecha = item.createdAt
    ? new Date(item.createdAt).toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;
  const tags = item.tags
    ? item.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <>
      <div className="page-header">
        <Container style={{ maxWidth: "780px" }}>
          <RevealOnScroll>
            <Link
              to="/articulos"
              className="text-secondary small mb-3 d-inline-block text-decoration-none"
              style={{ letterSpacing: "0.01em" }}
            >
              ← Volver a artículos
            </Link>
            <h1 className="section-title mb-2">{item.titulo}</h1>
            {fecha && (
              <p className="text-secondary mb-0" style={{ fontSize: "0.9rem" }}>
                {fecha}
              </p>
            )}
          </RevealOnScroll>
        </Container>
      </div>

      <div className="section-white">
        <Container style={{ maxWidth: "780px" }}>
          {imgSrc && (
            <RevealOnScroll>
              <img
                src={imgSrc}
                alt={item.titulo}
                className="w-100 mb-4"
                style={{
                  borderRadius: "var(--radius-md)",
                  maxHeight: "420px",
                  objectFit: "cover",
                }}
                loading="eager"
                decoding="async"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </RevealOnScroll>
          )}

          {tags.length > 0 && (
            <RevealOnScroll delay={0.05}>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    bg="light"
                    text="dark"
                    className="skill-badge"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </RevealOnScroll>
          )}

          <RevealOnScroll delay={0.1}>
            <div
              className="article-content text-secondary"
              style={{ fontSize: "1rem" }}
            >
              {stripTags(item.contenido)}
            </div>
          </RevealOnScroll>
        </Container>
      </div>
    </>
  );
}

export default ArticuloDetalle;
