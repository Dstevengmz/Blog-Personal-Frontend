import { useState } from "react";
import { Card } from "react-bootstrap";

function ProjectImage({ src, alt, priority = false }) {
  const [error, setError] = useState(false);
  
  if (!src || error) {
    return (
      <div className="img-contain-180 d-flex align-items-center justify-content-center bg-light">
        <span className="text-secondary">Sin imagen</span>
      </div>
    );
  }

  return (
    <Card.Img
      variant="top"
      src={src}
      alt={alt || "Imagen del proyecto"}
      className="img-contain-180"
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "low"}
      onError={() => setError(true)}
    />
  );
}

export default ProjectImage;