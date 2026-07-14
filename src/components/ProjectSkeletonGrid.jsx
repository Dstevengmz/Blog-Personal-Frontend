import { Row, Col } from "react-bootstrap";

function ProjectSkeletonGrid({ count = 6 }) {
  return (
    <Row className="g-4" aria-busy="true" aria-label="Cargando proyectos">
      {[...Array(count)].map((_, i) => (
        <Col key={i} md={6} lg={4}>
          <div className="skeleton-card" aria-hidden="true">
            <div className="skeleton skeleton-img" />
            <div className="p-3">
              <div className="skeleton skeleton-line skeleton-line-title" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line skeleton-line-short" />
              <div className="mt-3">
                <div className="skeleton skeleton-btn" />
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default ProjectSkeletonGrid;
