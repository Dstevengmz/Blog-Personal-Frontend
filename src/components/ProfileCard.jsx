import { Card, Button, Badge } from "react-bootstrap";
import { Github, Linkedin, Twitter } from "react-bootstrap-icons";
import profile from "../profile.config";
import { Link } from "react-router-dom";
function ProfileCard() {
  const {
    name,
    role,
    location,
    bio,
    avatarUrl,
    website,
    github,
    linkedin,
    skills = [],
  } = profile;

  return (
    <Card className="shadow-sm">
      <Card.Body className="d-flex flex-column flex-md-row align-items-center gap-3">
        <img
          src={avatarUrl}
          alt={name}
          width={120}
          height={120}
          className="rounded-circle object-fit-cover"
          style={{ objectFit: "cover" }}
        />
        <div className="w-100">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-2">
            <div>
              <h4 className="mb-1">{name}</h4>
              <div className="text-secondary">
                {role}
                {location ? ` · ${location}` : ""}
              </div>
            </div>
            <div className="d-flex gap-2 mt-2 mt-md-0">
              {github && (
                <Button
                  as="a"
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  variant="outline-dark"
                  size="sm"
                >
                  <Github className="me-1" /> GitHub
                </Button>
              )}
              {linkedin && (
                <Button
                  as="a"
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  variant="outline-primary"
                  size="sm"
                >
                  <Linkedin className="me-1" /> LinkedIn
                </Button>
              )}
            </div>
          </div>
          {bio && <Card.Text className="text-secondary">{bio}</Card.Text>}
          {skills.length > 0 && (
            <div className="d-flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <Badge bg="light" text="dark" key={i}>
                  {s}
                </Badge>
              ))}
            </div>
          )}
          <div className="d-flex gap-2 mt-3">
            <Link to="/contacto">
              <Button variant="outline-primary">Contactar</Button>
            </Link>{" "}
            {website && (
              <Button
                as="a"
                href={website}
                target="_blank"
                rel="noreferrer"
                variant="outline-secondary"
                size="sm"
              >
                Sitio Web
              </Button>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
export default ProfileCard;
