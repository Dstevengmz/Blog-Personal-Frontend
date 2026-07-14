import { Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { assetUrl } from "../lib/assetUrl";
import {
  isLearningProject,
  projectCategory,
  projectImage,
  projectTechnologies,
  validExternalUrl,
} from "../lib/projects";
import ProjectImage from "./VelocidaImagenes";

function ProjectCard({ project, priority = false }) {
  const technologies = projectTechnologies(project).slice(0, 5);
  const github = validExternalUrl(project?.github);
  const demo = validExternalUrl(project?.demoUrl);

  return (
    <Card className="h-100 card-pro project-card">
      <ProjectImage
        src={assetUrl(projectImage(project))}
        alt={project?.titulo ? `Vista del proyecto ${project.titulo}` : "Vista del proyecto"}
        priority={priority}
      />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex flex-wrap gap-2 mb-3">
          <Badge bg="light" text="dark" className="project-category">
            {projectCategory(project)}
          </Badge>
          {isLearningProject(project) && (
            <Badge bg="secondary">Laboratorio técnico</Badge>
          )}
        </div>
        <Card.Title as="h3" className="project-card__title">
          {project?.titulo || "Proyecto sin título"}
        </Card.Title>
        {project?.descripcion && (
          <Card.Text className="text-secondary line-clamp-3">
            {project.descripcion}
          </Card.Text>
        )}
        {technologies.length > 0 && (
          <ul className="project-tech-list" aria-label="Tecnologías principales">
            {technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        )}
        <div className="mt-auto d-flex flex-wrap gap-2 pt-3">
          <Button as={Link} to={`/proyectos/${project.id}`} variant="primary" size="sm">
            Ver detalles
          </Button>
          {github && (
            <Button as="a" href={github} target="_blank" rel="noopener noreferrer" variant="outline-dark" size="sm">
              Repositorio
              <span className="visually-hidden"> de {project.titulo} (abre en una pestaña nueva)</span>
            </Button>
          )}
          {demo && (
            <Button as="a" href={demo} target="_blank" rel="noopener noreferrer" variant="outline-primary" size="sm">
              Demo
              <span className="visually-hidden"> de {project.titulo} (abre en una pestaña nueva)</span>
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;
