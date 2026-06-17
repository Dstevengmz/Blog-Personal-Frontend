import { useEffect, useState, useCallback } from "react";
import { assetUrl } from "../lib/assetUrl";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Alert,
} from "react-bootstrap";
import ProjectImage from "../components/VelocidaImagenes";
import ProjectSkeletonGrid from "../components/ProjectSkeletonGrid";
import RevealOnScroll from "../components/RevealOnScroll";
import { useNavigate } from "react-router-dom";
import { listarProyectos } from "../services/ProyectosService";

function Proyectos() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [tipo, setTipo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async (filtro) => {
    setLoading(true);
    setError("");
    try {
      const data = await listarProyectos(filtro || undefined);
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(
        e?.response?.data?.error || "No se pudieron cargar los proyectos"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData("");
  }, [fetchData]);

  const onChangeTipo = async (nuevo) => {
    setTipo(nuevo);
    await fetchData(nuevo);
  };

  return (
    <>
      <div className="page-header">
        <Container>
          <RevealOnScroll>
            <h1 className="section-title text-center mb-0">Mis Proyectos</h1>
          </RevealOnScroll>
        </Container>
      </div>

      <div className="section-white">
        <Container>
          <RevealOnScroll delay={0.1}>
          <div className="d-flex align-items-center gap-2 mb-4">
            <span className="text-secondary small fw-medium">Filtrar:</span>
            <Button
              variant={tipo === "" ? "primary" : "outline-secondary"}
              size="sm"
              onClick={() => onChangeTipo("")}
            >
              Todos
            </Button>
            <Button
              variant={tipo === "web" ? "primary" : "outline-secondary"}
              size="sm"
              onClick={() => onChangeTipo("web")}
            >
              Web
            </Button>
            <Button
              variant={tipo === "movil" ? "primary" : "outline-secondary"}
              size="sm"
              onClick={() => onChangeTipo("movil")}
            >
              Móvil
            </Button>
          </div>
          </RevealOnScroll>

          {loading && <ProjectSkeletonGrid count={6} />}

          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}

          {!loading && !error && items.length === 0 && (
            <Alert variant="secondary">Aún no hay proyectos publicados.</Alert>
          )}

          {!loading && !error && items.length > 0 && (
            <Row className="g-4">
              {items.map((p, index) => {
                const firstImg =
                  p?.imagenes?.[0]?.thumbnailUrl || p?.imagenes?.[0]?.url;
                const imgSrc = assetUrl(firstImg);
                return (
                  <Col key={p.id} md={6} lg={4}>
                    <RevealOnScroll delay={Math.min(index * 0.1, 0.3)} className="h-100">
                    <Card
                      className="h-100 card-pro text-reset text-decoration-none"
                      onClick={() => navigate(`/proyectos/${p.id}`)}
                    >
                      <ProjectImage
                        src={imgSrc}
                        alt={p.titulo}
                        priority={index < 3}
                      />
                      <Card.Body className="d-flex flex-column">
                        <div className="d-flex align-items-start justify-content-between mb-1">
                          <Card.Title className="mb-0">{p.titulo}</Card.Title>
                          {p.github && (
                            <Badge bg="primary" className="opacity-75">
                              Repo
                            </Badge>
                          )}
                        </div>
                        {p.descripcion && (
                          <Card.Text className="text-secondary line-clamp-3">
                            {p.descripcion}
                          </Card.Text>
                        )}
                        <div className="mt-auto d-flex gap-2">
                          {p.github && (
                            <Button
                              as="a"
                              href={p.github}
                              target="_blank"
                              rel="noreferrer"
                              variant="outline-dark"
                              size="sm"
                              onClick={(e) => e.stopPropagation()}
                            >
                              GitHub
                            </Button>
                          )}
                          {p.demoUrl && (
                            <Button
                              as="a"
                              href={p.demoUrl}
                              target="_blank"
                              rel="noreferrer"
                              variant="primary"
                              size="sm"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Demo
                            </Button>
                          )}
                        </div>
                      </Card.Body>
                    </Card>
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

export default Proyectos;
