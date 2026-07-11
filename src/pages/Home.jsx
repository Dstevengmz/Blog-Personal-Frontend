import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Badge,
  Alert,
  Accordion,
} from "react-bootstrap";
import ProjectImage from "../components/VelocidaImagenes";
import RevealOnScroll from "../components/RevealOnScroll";
import ProjectSkeletonGrid from "../components/ProjectSkeletonGrid";

import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { assetUrl, cloudinaryTransform } from "../lib/assetUrl";
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
        const data = await listarProyectos(undefined, 6);
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
      <div className="hero-section min-vh-100 d-flex align-items-center">
        <Container>
          <Row className="align-items-center gy-4">
            <Col md={7} lg={7}>
              <RevealOnScroll>
              <Badge bg="primary" className="mb-3 opacity-75">
                Disponible para oportunidades
              </Badge>
              <h1 className="fw-bold lh-sm mb-3 section-title">
                Desarrollador Full&nbsp;Stack y Analista de Datos enfocado en
                crear soluciones web funcionales, escalables y con apoyo de IA
              </h1>
              <p className="lead text-secondary mb-3">
                Soy {profile.displayName}, {profile.role}. Construyo
                aplicaciones web, móviles y soluciones orientadas a datos usando{" "}
                <strong>React</strong>, <strong>Node.js</strong>,{" "}
                <strong>Python</strong>, <strong>MySQL</strong> y herramientas
                de IA. Me enfoco en transformar necesidades reales en sistemas
                funcionales, organizados y listos para ser probados en escenarios
                reales.
              </p>
              <ul className="text-secondary mb-4 ps-3">
                <li>Frontend: React, Vite, Tailwind CSS, Bootstrap</li>
                <li>Backend: Node.js, Express, Python, Flask, Django</li>
                <li>Datos: MySQL, PostgreSQL, MongoDB, BigQuery</li>
                <li>Herramientas: Git, Docker, Postman, Sequelize, JWT, Looker Studio</li>
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
                    <Badge bg="light" text="dark" key={s} className="skill-badge">
                      {s}
                    </Badge>
                  ))}
              </div>
              </RevealOnScroll>
            </Col>
            <Col md={5} lg={5} className="text-center text-md-end">
              <img
                src={cloudinaryTransform(profile.avatarUrl, 'w_700,c_limit,q_auto:good,f_auto')}
                alt={`Foto de ${profile.name}`}
                className="img-fluid rounded-4 shadow max-w-380 object-cover hover-lift animate-float"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              <div className="text-secondary mt-2 small">
                {profile.location}
              </div>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col md={12}>
              <RevealOnScroll>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Sobre mí</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Soy una persona orientada al aprendizaje continuo, con
                      interés en el desarrollo full-stack, análisis de datos e
                      inteligencia artificial aplicada. Me gusta construir
                      soluciones prácticas, entender el problema antes de
                      programar y validar que cada funcionalidad realmente aporte
                      valor al usuario final.
                    </p>
                    <p>
                      He trabajado en proyectos académicos, personales y
                      empresariales relacionados con software, dashboards,
                      automatización, IoT, bases de datos y aplicaciones web.
                      Actualmente estoy fortaleciendo mi perfil como desarrollador
                      y analista de datos, integrando herramientas modernas de IA
                      para acelerar procesos de desarrollo sin perder criterio
                      técnico ni control de calidad.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>Mi forma de trabajar</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Trabajo de forma organizada, dividiendo los proyectos por
                      módulos, fases y pruebas. Me enfoco en entender primero la
                      necesidad del usuario, definir la lógica del negocio,
                      construir funcionalidades claras y validar los resultados
                      con pruebas reales. Uso Git, documentación, APIs, bases de
                      datos y herramientas de IA como apoyo para mejorar
                      productividad y calidad.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>Objetivos y metas</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Mi objetivo es seguir creciendo como Desarrollador Full
                      Stack y Analista de Datos, participando en proyectos donde
                      pueda aplicar desarrollo web, automatización, inteligencia
                      artificial y análisis de información para resolver problemas
                      reales. Busco oportunidades donde pueda aprender, aportar
                      valor y fortalecer mis habilidades técnicas y profesionales.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              </RevealOnScroll>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section-soft">
        <Container>
          <RevealOnScroll>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="section-title mb-0">¿Cómo puedo ayudarte?</h2>
            <div className="d-none d-md-flex gap-2">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => scrollServices(-360)}
              >
                ◀
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => scrollServices(360)}
              >
                ▶
              </Button>
            </div>
          </div>
          <div ref={servicesRef} className="x-scroll-snap d-flex gap-3 pb-2">
            {/* Frontend */}
            <Card className="card-pro card-service min-w-320 snap-start">
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
            <Card className="card-pro card-service min-w-320 snap-start">
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
            <Card className="card-pro card-service min-w-320 snap-start">
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
            <Card className="card-pro card-service min-w-320 snap-start">
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
            <Card className="card-pro card-service min-w-320 snap-start">
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
            <Card className="card-pro card-service min-w-320 snap-start">
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
            <Card className="card-pro card-service min-w-320 snap-start">
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
            <Card className="card-pro card-service min-w-320 snap-start">
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
            <Card className="card-pro card-service min-w-320 snap-start">
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
            <Card className="card-pro card-service min-w-320 snap-start">
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
            <Card className="card-pro card-service min-w-320 snap-start">
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
            <Card className="card-pro card-service min-w-320 snap-start">
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
          </RevealOnScroll>
        </Container>
      </div>
      <div className="section-white">
      <Container>
        <RevealOnScroll>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="section-title mb-0">Proyectos recientes</h2>
          <Button
            as={Link}
            to="/proyectos"
            variant="outline-primary"
            size="sm"
          >
            Ver todos
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
        <Row className="g-4">
          {items.map((p, index) => {
            const firstImg = p?.imagenes?.[0]?.url;
            const imgSrc = assetUrl(firstImg);
            return (
              <Col key={p.id} md={6} lg={4}>
                <RevealOnScroll delay={Math.min(index * 0.1, 0.3)} className="h-100">
                <Card
                  as={Link}
                  to={`/proyectos/${p.id}`}
                  className="h-100 card-pro text-reset text-decoration-none"
                >


                  <ProjectImage src={imgSrc} alt={p.titulo} priority={index === 0} />



                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex align-items-start justify-content-between mb-1">
                      <Card.Title className="mb-0">{p.titulo}</Card.Title>
                      {p.github && <Badge bg="primary" className="opacity-75">Repo</Badge>}
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
                </RevealOnScroll>
              </Col>
            );
          })}
        </Row>
      </Container>
      </div>
    </>
  );
}
export default Home;
