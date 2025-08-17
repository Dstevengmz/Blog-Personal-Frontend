import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import ProfileCard from "../components/ProfileCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { assetUrl } from "../lib/assetUrl";
import { listarProyectos } from "../services/ProyectosService";

 function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


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
      <div className="bg-light py-5 border-bottom">
        <Container>
          <Row className="align-items-center gy-4">
            <Col md={7}>
              <Badge bg="primary" className="mb-3">
                Blog Personal
              </Badge>
              <h1 className="display-5 fw-bold mb-3">
                Hola, soy Darwin Gomez — Ingeniero Informático y Desarrollador
                de software
              </h1>
              <p className="lead text-secondary mb-4">
                Explora mis proyectos recientes y los aprendizajes del día a
                día.
              </p>
              <div className="d-flex gap-3">
                <Button as={Link} to="/proyectos" variant="primary" size="lg">
                  Ver Proyectos
                </Button>
              </div>
            </Col>
            <Col md={5}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title className="mb-2">Sobre este blog</Card.Title>
                  <Card.Text className="text-secondary">
                    Un espacio para documentar mis proyectos y mostrar trabajos
                    realizados. ¡Bienvenido!
                  </Card.Text>
                  <div className="d-flex flex-wrap gap-2">
                    <Badge bg="success">Javascript</Badge>
                    <Badge bg="success">Python</Badge>
                    <Badge bg="success">Django</Badge>
                    <Badge bg="success">Node.js</Badge>
                    <Badge bg="dark">Sequelize</Badge>
                    <Badge bg="info" text="dark">
                      React
                    </Badge>
                    <Badge bg="info" text="dark">
                      Djando
                    </Badge>
                    <Badge bg="info" text="dark">
                      Flask
                    </Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
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
                      style={{ objectFit: "contain", height: 180, backgroundColor: "#f8f9fa" }}
                    />
                  )}
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex align-items-start justify-content-between mb-1">
                      <Card.Title className="mb-0">{p.titulo}</Card.Title>
                      {p.github && <Badge bg="dark">Repo</Badge>}
                    </div>
                    {p.descripcion && (
                      <Card.Text
                        className="text-secondary"
                        style={{
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
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
      <div className="bg-white py-5 border-top">
        <Container>
          <h2 className="mb-4">Sobre mí</h2>
          <Row>
            <Col md={12}>
              <ProfileCard />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
export default Home;