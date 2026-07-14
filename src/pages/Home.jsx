import { createElement, useCallback, useEffect, useState } from "react";
import { Alert, Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import {
  Bug,
  Cloud,
  CodeSlash,
  Database,
  FileText,
  Phone,
  Server,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import ProjectSkeletonGrid from "../components/ProjectSkeletonGrid";
import RevealOnScroll from "../components/RevealOnScroll";
import { cloudinaryTransform } from "../lib/assetUrl";
import { sortProjects } from "../lib/projects";
import profile from "../profile.config";
import { listarProyectos } from "../services/ProyectosService";

const skillGroups = [
  { title: "Frontend", skills: ["React", "JavaScript", "Vite", "Bootstrap", "Tailwind CSS"] },
  { title: "Backend", skills: ["Node.js", "Express", "Python", "Flask", "Django"] },
  { title: "Bases de datos", skills: ["MySQL", "PostgreSQL", "MongoDB"] },
  { title: "Desarrollo móvil", skills: ["Flutter", "Dart"] },
  { title: "Herramientas y prácticas", skills: ["Git", "GitHub", "Docker", "Postman", "Sequelize", "JWT", "APIs REST"] },
];

const capabilities = [
  {
    title: "Desarrollo frontend",
    description: "Interfaces web responsive y accesibles con componentes reutilizables y una experiencia clara para el usuario.",
    icon: CodeSlash,
  },
  {
    title: "Backend y APIs REST",
    description: "Servicios con Node.js, Express o Python, autenticación, validaciones, reglas de negocio y organización por capas.",
    icon: Server,
  },
  {
    title: "Aplicaciones móviles",
    description: "Aplicaciones multiplataforma con Flutter y Dart, conectadas a servicios y bases de datos mediante APIs.",
    icon: Phone,
  },
  {
    title: "Bases de datos",
    description: "Modelado, consultas e integración de bases SQL y NoSQL para respaldar procesos reales de una aplicación.",
    icon: Database,
  },
  {
    title: "Pruebas y documentación",
    description: "Pruebas unitarias y de integración, colecciones de endpoints y documentación para facilitar el mantenimiento.",
    icon: Bug,
  },
  {
    title: "Despliegue y DevOps",
    description: "Preparación de aplicaciones para despliegue, manejo de variables de entorno, Docker y control de versiones.",
    icon: Cloud,
  },
];

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProjects = useCallback(async (signal) => {
    setLoading(true);
    setError("");
    try {
      const data = await listarProyectos(undefined, 6, { signal });
      setItems(sortProjects(Array.isArray(data) ? data : []).slice(0, 6));
    } catch (requestError) {
      if (requestError?.code !== "ERR_CANCELED") {
        setError(requestError?.response?.data?.error || "No fue posible cargar los proyectos en este momento.");
      }
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadProjects(controller.signal);
    return () => controller.abort();
  }, [loadProjects]);

  return (
    <>
      <section id="inicio" className="hero-section" aria-labelledby="hero-title">
        <Container>
          <Row className="align-items-center gy-5">
            <Col md={7} lg={7}>
              <RevealOnScroll>
                <Badge bg="success" className="availability-badge mb-3">
                  <span aria-hidden="true">●</span> Disponible para oportunidades
                </Badge>
                <p className="hero-eyebrow mb-2">Hola, soy {profile.displayName}</p>
                <h1 id="hero-title" className="hero-title mb-3">
                  Desarrollador de Software Full Stack
                </h1>
                <p className="hero-description mb-4">
                  Desarrollo aplicaciones web y móviles con React, Node.js, Python, Flutter y bases de datos SQL. Transformo necesidades reales en soluciones funcionales, organizadas y listas para ser utilizadas.
                </p>
                <div className="d-flex flex-wrap gap-3 hero-actions">
                  <Button as={Link} to="/proyectos" variant="primary" size="lg">Ver proyectos</Button>
                  <Button as={Link} to="/contacto" variant="outline-primary" size="lg">Contactarme</Button>
                </div>
                <div className="hero-social-links" aria-label="Perfiles profesionales">
                  <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub<span className="visually-hidden"> (abre en una pestaña nueva)</span></a>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<span className="visually-hidden"> (abre en una pestaña nueva)</span></a>
                </div>
              </RevealOnScroll>
            </Col>
            <Col md={5} lg={5} className="text-center text-md-end">
              <RevealOnScroll delay={0.1}>
                <img
                  src={cloudinaryTransform(profile.avatarUrl, "w_700,c_limit,q_auto:good,f_auto")}
                  alt="Darwin Steven Gómez, desarrollador de software"
                  className="hero-photo"
                  width="520"
                  height="520"
                  decoding="async"
                  fetchPriority="high"
                />
                <p className="text-secondary mt-3 mb-0 small">{profile.location}</p>
              </RevealOnScroll>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="sobre-mi" className="section-white anchor-section" aria-labelledby="about-title">
        <Container>
          <Row className="gy-4 gx-lg-5 align-items-start">
            <Col lg={5}>
              <RevealOnScroll>
                <p className="section-kicker">Sobre mí</p>
                <h2 id="about-title" className="section-title mb-3">Software orientado a necesidades reales</h2>
              </RevealOnScroll>
            </Col>
            <Col lg={7}>
              <RevealOnScroll delay={0.08}>
                <p className="about-lead">
                  Soy Darwin Steven Gómez, Ingeniero en Informática y Desarrollador de Software. Construyo aplicaciones web y móviles, APIs REST y sistemas empresariales utilizando React, Node.js, Python, Flutter y bases de datos SQL.
                </p>
                <p className="text-secondary">
                  Puedo participar en frontend, backend, modelado de datos, pruebas, documentación y preparación para despliegue. Me enfoco en entender el problema, organizar la solución por módulos y entregar funcionalidades mantenibles y claras.
                </p>
                <div className="complementary-note">
                  <FileText size={20} aria-hidden="true" />
                  <p className="mb-0">Conocimientos complementarios en análisis de datos, automatización e integración de herramientas de inteligencia artificial.</p>
                </div>
              </RevealOnScroll>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-soft" aria-labelledby="capabilities-title">
        <Container>
          <RevealOnScroll>
            <p className="section-kicker">Lo que puedo aportar</p>
            <h2 id="capabilities-title" className="section-title mb-2">Capacidades de desarrollo</h2>
            <p className="section-copy mb-5">Trabajo en las distintas capas de una aplicación y mantengo el foco en su funcionamiento, calidad y facilidad de mantenimiento.</p>
          </RevealOnScroll>
          <Row className="g-4">
            {capabilities.map(({ title, description, icon }, index) => (
              <Col key={title} md={6} lg={4}>
                <RevealOnScroll delay={Math.min(index * 0.06, 0.24)} className="h-100">
                  <Card className="card-pro capability-card h-100">
                    <Card.Body>
                      <span className="capability-icon">{createElement(icon, { size: 23, "aria-hidden": true })}</span>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </Card.Body>
                  </Card>
                </RevealOnScroll>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section id="habilidades" className="section-white anchor-section" aria-labelledby="skills-title">
        <Container>
          <RevealOnScroll>
            <p className="section-kicker">Tecnologías</p>
            <h2 id="skills-title" className="section-title mb-2">Habilidades organizadas por área</h2>
            <p className="section-copy mb-5">Tecnologías y herramientas presentes en mi formación y en los proyectos que desarrollo.</p>
          </RevealOnScroll>
          <Row className="g-4">
            {skillGroups.map((group) => (
              <Col key={group.title} md={6} lg={4}>
                <div className="skill-group h-100">
                  <h3>{group.title}</h3>
                  <ul>
                    {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
                  </ul>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="section-soft" aria-labelledby="featured-projects-title">
        <Container>
          <RevealOnScroll>
            <div className="section-heading-row">
              <div>
                <p className="section-kicker">Trabajo seleccionado</p>
                <h2 id="featured-projects-title" className="section-title mb-2">Proyectos de software</h2>
                <p className="section-copy mb-0">Aplicaciones cargadas dinámicamente desde la base de datos.</p>
              </div>
              <Button as={Link} to="/proyectos" variant="outline-primary">Ver todos</Button>
            </div>
          </RevealOnScroll>

          <div className="mt-5" aria-live="polite">
            {loading && <ProjectSkeletonGrid count={6} />}
            {!loading && error && (
              <Alert variant="danger">
                <Alert.Heading as="h3" className="fs-6">No pudimos mostrar los proyectos</Alert.Heading>
                <p>{error}</p>
                <Button variant="outline-danger" size="sm" onClick={() => loadProjects()}>Reintentar</Button>
              </Alert>
            )}
            {!loading && !error && items.length === 0 && (
              <Alert variant="secondary">Aún no hay proyectos publicados.</Alert>
            )}
            {!loading && !error && items.length > 0 && (
              <Row className="g-4">
                {items.map((project, index) => (
                  <Col key={project.id} md={6} lg={4}>
                    <RevealOnScroll delay={Math.min(index * 0.06, 0.24)} className="h-100">
                      <ProjectCard project={project} priority={index === 0} />
                    </RevealOnScroll>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </Container>
      </section>

      <section className="contact-cta" aria-labelledby="contact-cta-title">
        <Container>
          <div className="contact-cta__inner">
            <div>
              <h2 id="contact-cta-title">¿Buscas un desarrollador para tu equipo?</h2>
              <p>Conversemos sobre la oportunidad, el producto o el problema técnico que necesitas resolver.</p>
            </div>
            <Button as={Link} to="/contacto" variant="light" size="lg">Contactarme</Button>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Home;
