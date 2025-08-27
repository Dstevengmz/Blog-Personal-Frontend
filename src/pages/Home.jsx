import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Badge,
  Spinner,
  Alert,
  Accordion,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { assetUrl } from "../lib/assetUrl";
import profile from "../profile.config";
import { listarProyectos } from "../services/ProyectosService";
import { CodeSlash, Server, Cloud } from "react-bootstrap-icons";
import {
  Bug,
  Phone,
  Palette,
  FileText,
  Cpu,
  Database,
  Kanban,
  Git,
  Send,
} from "react-bootstrap-icons";

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const servicesRef = useRef(null);
  const scrollServices = (delta) => {
    if (servicesRef.current) {
      servicesRef.current.scrollBy({ left: delta, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await listarProyectos();
        setItems(Array.isArray(data) ? data.slice(0, 6) : []);
      } catch (e) {
        setError(
          e?.response?.data?.error || "No se pudieron cargar los proyectos"
        );
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);
  return (
    <>
      {/* Hero */}
      <div className="bg-light border-bottom min-vh-100 d-flex align-items-center">
        <Container>
          <Row className="align-items-center gy-4">
            <Col md={7} lg={7}>
              <Badge bg="dark" className="mb-3">
                Disponible para oportunidades
              </Badge>
              <h1 className="fw-bold lh-sm mb-3">
                Desarrollador Full&nbsp;Stack que convierte ideas en productos
                listos para producción
              </h1>
              <p className="lead text-secondary mb-3">
                Soy {profile.name.split(" ")[0]} {profile.name.split(" ")[1]},{" "}
                {profile.role}. Construyo aplicaciones web y móviles con
                <strong> React</strong>, <strong>Node.js</strong> y{" "}
                <strong>Python/Django</strong>, cuidando rendimiento, DX y
                calidad.
              </p>
              <ul className="text-secondary mb-4 ps-3">
                <li>Frontend: React, Vite, Bootstrap</li>
                <li>Backend: Node.js (Express), Python/Django</li>
                <li>Datos: MySQL, PostgreSQL, MongoDB • CI/CD y Docker</li>
              </ul>
              <div className="d-flex flex-wrap gap-3">
                <Button as={Link} to="/contacto" variant="primary" size="lg">
                  Hablemos
                </Button>
                <Button
                  as={Link}
                  to="/proyectos"
                  variant="outline-secondary"
                  size="lg"
                >
                  Ver proyectos
                </Button>
              </div>

              <div className="d-flex flex-wrap gap-2 mt-4">
                {Array.isArray(profile.skills) &&
                  profile.skills.slice(0, 10).map((s) => (
                    <Badge bg="light" text="dark" key={s} className="border">
                      {s}
                    </Badge>
                  ))}
              </div>
            </Col>
            <Col md={5} lg={5} className="text-center text-md-end">
              <img
                src={profile.avatarUrl}
                alt={`Foto de ${profile.name}`}
                className="img-fluid rounded-4 shadow-sm max-w-380 object-cover"
              />
              <div className="text-secondary mt-2 small">
                {profile.location}
              </div>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col md={12}>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Sobre mí</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Soy ingeniero informático con experiencia en desarrollo
                      web, aplicaciones móviles y gestión de bases de datos. Me
                      destaco por ofrecer soluciones eficientes y de alta
                      calidad, resolviendo problemas con rapidez y adaptándome a
                      nuevas tecnologías.
                    </p>
                    <p>
                      Actualmente, estoy complementando mi formación en Análisis
                      y Desarrollo de Software en el SENA y busco oportunidades
                      para aplicar mis conocimientos en proyectos desafiantes
                      que me permitan seguir creciendo profesionalmente.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>Mi forma de trabajar</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Abordo los retos con un enfoque creativo y pragmático,
                      priorizando soluciones funcionales y efectivas. Me adapto
                      con facilidad a diferentes entornos de trabajo y disfruto
                      colaborar con equipos para cumplir objetivos ambiciosos,
                      cuidando siempre la calidad y los detalles.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>Objetivos y metas</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Mi objetivo es consolidar mi carrera en el sector
                      tecnológico, integrándome en una empresa sólida donde
                      pueda aportar desde el primer día y seguir desarrollándome
                      profesionalmente. A largo plazo, aspiro a liderar
                      proyectos innovadores que generen un impacto real y
                      contribuyan a la transformación digital.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="bg-white py-5 border-top">
        <Container>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h2 className="mb-0">¿Cómo puedo ayudarte?</h2>
            <div className="d-none d-md-flex gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => scrollServices(-360)}
              >
                ◀
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => scrollServices(360)}
              >
                ▶
              </Button>
            </div>
          </div>
          <div ref={servicesRef} className="x-scroll-snap d-flex gap-3 pb-2">
            {/* Frontend */}
            <Card className="shadow-sm min-w-320 snap-start">
              <Card.Body>
                <div className="text-primary mb-2">
                  <CodeSlash size={24} />
                </div>
                <h5 className="mb-2">Frontend Web</h5>
                <p className="text-secondary mb-0">
                  Interfaces rápidas y accesibles con React, Vite y Bootstrap.
                </p>
              </Card.Body>
            </Card>
            {/* Backend */}
            <Card className="shadow-sm min-w-320 snap-start">
              <Card.Body>
                <div className="text-primary mb-2">
                  <Server size={24} />
                </div>
                <h5 className="mb-2">APIs y Backend</h5>
                <p className="text-secondary mb-0">
                  Node.js (Express) o Python/Django. Auth, ORM, validaciones y
                  seguridad.
                </p>
              </Card.Body>
            </Card>
            {/* DevOps */}
            <Card className="shadow-sm min-w-320 snap-start">
              <Card.Body>
                <div className="text-primary mb-2">
                  <Cloud size={24} />
                </div>
                <h5 className="mb-2">Deploy y DevOps</h5>
                <p className="text-secondary mb-0">
                  Docker, CI/CD y despliegues en la nube con monitoreo.
                </p>
              </Card.Body>
            </Card>
            {/* Testing */}
            <Card className="shadow-sm min-w-320 snap-start">
              <Card.Body>
                <div className="text-primary mb-2">
                  <Bug size={24} />
                </div>
                <h5 className="mb-2">Pruebas de software</h5>
                <p className="text-secondary mb-0">
                  Caja negra y caja blanca, unitarias e integración; calidad
                  antes del release.
                </p>
              </Card.Body>
            </Card>
            {/* Mobile */}
            <Card className="shadow-sm min-w-320 snap-start">
              <Card.Body>
                <div className="text-primary mb-2">
                  <Phone size={24} />
                </div>
                <h5 className="mb-2">Apps móviles</h5>
                <p className="text-secondary mb-0">
                  Experiencia con Flutter/Dart y patrones limpios para apps
                  multi-plataforma.
                </p>
              </Card.Body>
            </Card>
            {/* UI/UX */}
            <Card className="shadow-sm min-w-320 snap-start">
              <Card.Body>
                <div className="text-primary mb-2">
                  <Palette size={24} />
                </div>
                <h5 className="mb-2">Interfaces (UI/UX)</h5>
                <p className="text-secondary mb-0">
                  Componentes accesibles, responsive y consistentes; foco en DX
                  y UX.
                </p>
              </Card.Body>
            </Card>
            {/* Documentación */}
            <Card className="shadow-sm min-w-320 snap-start">
              <Card.Body>
                <div className="text-primary mb-2">
                  <FileText size={24} />
                </div>
                <h5 className="mb-2">Documentación</h5>
                <p className="text-secondary mb-0">
                  Docs técnicas, Readmes y colecciones de API para onboarding
                  rápido.
                </p>
              </Card.Body>
            </Card>
            {/* Arduino / Hardware */}
            <Card className="shadow-sm min-w-320 snap-start">
              <Card.Body>
                <div className="text-primary mb-2">
                  <Cpu size={24} />
                </div>
                <h5 className="mb-2">Arduino y hardware</h5>
                <p className="text-secondary mb-0">
                  Prototipos con sensores y microcontroladores; integración con
                  software.
                </p>
              </Card.Body>
            </Card>
            <Card className="shadow-sm min-w-320 snap-start">
              <Card.Body>
                <div className="text-primary mb-2">
                  <Database size={24} />
                </div>
                <h5 className="mb-2">Bases de datos</h5>
                <p className="text-secondary mb-0">
                  Relacionales y NoSQL: modelado, consultas y optimización.
                </p>
              </Card.Body>
            </Card>
            <Card className="shadow-sm min-w-320 snap-start">
              <Card.Body>
                <div className="text-primary mb-2">
                  <Send size={24} />
                </div>
                <h5 className="mb-2">APIs y Postman</h5>
                <p className="text-secondary mb-0">
                  Colecciones, pruebas y automatización de endpoints para QA.
                </p>
              </Card.Body>
            </Card>
            <Card className="shadow-sm min-w-320 snap-start">
              <Card.Body>
                <div className="text-primary mb-2">
                  <Kanban size={24} />
                </div>
                <h5 className="mb-2">Metodologías ágiles</h5>
                <p className="text-secondary mb-0">
                  Scrum/Kanban, trabajo iterativo, gestión de backlog y
                  releases.
                </p>
              </Card.Body>
            </Card>
            <Card className="shadow-sm min-w-320 snap-start">
              <Card.Body>
                <div className="text-primary mb-2">
                  <Git size={24} />
                </div>
                <h5 className="mb-2">Control de versiones</h5>
                <p className="text-secondary mb-0">
                  Git, ramas, Pull Requests y buenas prácticas de flujo.
                </p>
              </Card.Body>
            </Card>
          </div>
          <div className="text-center mt-4 d-md-none">
            <Button
              as={Link}
              to="/contacto"
              variant="outline-secondary"
              size="md"
            >
              Agenda una llamada
            </Button>
          </div>
        </Container>
      </div>
      <Container className="py-5">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="mb-0">Proyectos recientes</h2>
          <Button
            as={Link}
            to="/proyectos"
            variant="outline-secondary"
            size="sm"
          >
            Ver todos
          </Button>
        </div>
        {loading && (
          <div className="d-flex align-items-center gap-2">
            <Spinner animation="border" size="sm" /> Cargando…
          </div>
        )}
        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}
        {!loading && !error && items.length === 0 && (
          <Alert variant="secondary">Aún no hay proyectos publicados.</Alert>
        )}
        <Row className="g-4">
          {items.map((p) => {
            const firstImg = p?.imagenes?.[0]?.url;
            const imgSrc = assetUrl(firstImg);
            return (
              <Col key={p.id} md={6} lg={4}>
                <Card
                  as={Link}
                  to={`/proyectos/${p.id}`}
                  className="h-100 shadow-sm text-reset text-decoration-none"
                >
                  {imgSrc && (
                    <Card.Img
                      variant="top"
                      src={imgSrc}
                      alt={p.titulo}
                      className="img-contain-180"
                    />
                  )}
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex align-items-start justify-content-between mb-1">
                      <Card.Title className="mb-0">{p.titulo}</Card.Title>
                      {p.github && <Badge bg="dark">Repo</Badge>}
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
                        >
                          Demo
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
export default Home;
