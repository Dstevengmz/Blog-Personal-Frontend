import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import ProjectCard from "../components/ProjectCard";
import ProjectSkeletonGrid from "../components/ProjectSkeletonGrid";
import RevealOnScroll from "../components/RevealOnScroll";
import { sortProjects } from "../lib/projects";
import { listarProyectos } from "../services/ProyectosService";

const filters = [
  { value: "", label: "Todos" },
  { value: "web", label: "Web" },
  { value: "movil", label: "Móvil" },
];

function Proyectos() {
  const [items, setItems] = useState([]);
  const [tipo, setTipo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const controllerRef = useRef(null);

  const fetchData = useCallback(async (filter) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);
    setError("");
    try {
      const data = await listarProyectos(filter || undefined, undefined, { signal: controller.signal });
      setItems(sortProjects(Array.isArray(data) ? data : []));
    } catch (requestError) {
      if (requestError?.code !== "ERR_CANCELED") {
        setError(requestError?.response?.data?.error || "No fue posible cargar los proyectos en este momento.");
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(tipo);
    return () => controllerRef.current?.abort();
  }, [fetchData, tipo]);

  return (
    <>
      <header className="page-header">
        <Container>
          <RevealOnScroll>
            <p className="section-kicker">Portafolio técnico</p>
            <h1 className="section-title mb-2">Proyectos de software</h1>
            <p className="section-copy mb-0">
              Aplicaciones web y móviles construidas para resolver procesos, organizar información e integrar frontend, backend y bases de datos.
            </p>
          </RevealOnScroll>
        </Container>
      </header>

      <section className="section-white" aria-label="Listado de proyectos">
        <Container>
          <RevealOnScroll delay={0.05}>
            <div className="project-filters mb-5" role="group" aria-label="Filtrar proyectos por plataforma">
              {filters.map((filter) => (
                <Button
                  key={filter.value || "all"}
                  variant={tipo === filter.value ? "primary" : "outline-secondary"}
                  size="sm"
                  onClick={() => setTipo(filter.value)}
                  aria-pressed={tipo === filter.value}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </RevealOnScroll>

          <div aria-live="polite">
            {loading && <ProjectSkeletonGrid count={6} />}
            {!loading && error && (
              <Alert variant="danger">
                <Alert.Heading as="h2" className="fs-6">No pudimos mostrar los proyectos</Alert.Heading>
                <p>{error}</p>
                <Button variant="outline-danger" size="sm" onClick={() => fetchData(tipo)}>Reintentar</Button>
              </Alert>
            )}
            {!loading && !error && items.length === 0 && (
              <Alert variant="secondary">
                No hay proyectos publicados para este filtro.
              </Alert>
            )}
            {!loading && !error && items.length > 0 && (
              <>
                <p className="results-count">{items.length} {items.length === 1 ? "proyecto" : "proyectos"}</p>
                <Row className="g-4">
                  {items.map((project, index) => (
                    <Col key={project.id} md={6} lg={4}>
                      <RevealOnScroll delay={Math.min(index * 0.06, 0.24)} className="h-100">
                        <ProjectCard project={project} priority={index < 2} />
                      </RevealOnScroll>
                    </Col>
                  ))}
                </Row>
              </>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}

export default Proyectos;
