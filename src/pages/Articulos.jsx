import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Badge, Alert } from "react-bootstrap";
import { assetUrl, cloudinaryTransform } from "../lib/assetUrl";
import ProjectSkeletonGrid from "../components/ProjectSkeletonGrid";
import RevealOnScroll from "../components/RevealOnScroll";
import { listarArticulos } from "../services/ArticulosService";

function Articulos() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await listarArticulos(undefined, { signal: controller.signal });
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        if (e?.code !== "ERR_CANCELED") {
          setError(e?.response?.data?.error || "No se pudieron cargar los artículos");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    run();
    return () => controller.abort();
  }, []);

  return (
    <>
      <div className="page-header">
        <Container>
          <RevealOnScroll>
            <h1 className="section-title mb-2">Artículos</h1>
            <p className="section-subtitle mb-0">
              Ideas, tutoriales y aprendizajes sobre desarrollo y tecnología.
            </p>
          </RevealOnScroll>
        </Container>
      </div>

      <div className="section-white">
        <Container>
          {loading && <ProjectSkeletonGrid count={6} />}

          {error && (
            <Alert variant="danger" className="mb-3">{error}</Alert>
          )}

          {!loading && !error && items.length === 0 && (
            <Alert variant="secondary">Aún no hay artículos publicados.</Alert>
          )}

          {!loading && !error && items.length > 0 && (
            <Row className="g-4">
              {items.map((a, index) => {
                const imgSrc = cloudinaryTransform(assetUrl(a.imagen || a.imagenes?.[0]?.url), 'w_500,c_limit,q_auto:good,f_auto');
                const rawText = a.contenido
                  ? a.contenido.replace(/<[^>]+>/g, "").trim()
                  : "";
                const excerpt = rawText.length > 180
                  ? rawText.slice(0, 180).trimEnd() + "…"
                  : rawText;
                const fecha = a.createdAt
                  ? new Date(a.createdAt).toLocaleDateString("es-CO", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : null;
                const tags = a.tags
                  ? a.tags.split(",").map((t) => t.trim()).filter(Boolean)
                  : [];

                return (
                  <Col key={a.id} md={6} lg={4}>
                    <RevealOnScroll delay={Math.min(index * 0.1, 0.3)} className="h-100 d-flex flex-column">
                    <article className="card-pro h-100 d-flex flex-column article-card">
                      <Link className="article-card__link" to={`/articulos/${a.id}`} aria-label={`Leer ${a.titulo}`}>
                      {imgSrc && (
                        <img
                          src={imgSrc}
                          alt={a.titulo}
                          className="img-contain-180 w-100"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      )}
                      <div className="p-3 d-flex flex-column flex-grow-1">
                        {fecha && (
                          <small className="text-secondary mb-1 d-block">
                            {fecha}
                          </small>
                        )}
                        <h5 className="fw-semibold mb-2 lh-sm line-clamp-2">{a.titulo}</h5>
                        {excerpt && (
                          <p
                            className="text-secondary mb-3"
                            style={{ fontSize: "0.88rem", lineHeight: "1.6" }}
                          >
                            {excerpt}
                          </p>
                        )}
                        {tags.length > 0 && (
                          <div className="mt-auto d-flex flex-wrap gap-1">
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
                        )}
                      </div>
                      </Link>
                    </article>
                    </RevealOnScroll>
                  </Col>
                );
              })}
            </Row>
          )}
        </Container>
      </div>
    </>
  );
}

export default Articulos;
