import { useState } from "react";
import { Card } from "react-bootstrap";
import { cloudinaryTransform } from "../lib/assetUrl";

function ProjectImage({ src, alt, priority = false }) {
  const [error, setError] = useState(false);
  const optimizedSrc = cloudinaryTransform(src, 'w_500,c_limit,q_auto:good,f_auto');

  if (!optimizedSrc || error) {
    return (
      <div className="img-contain-180 d-flex align-items-center justify-content-center bg-light">
        <span className="text-secondary">Sin imagen</span>
      </div>
    );
  }

  return (
    <Card.Img
      variant="top"
      src={optimizedSrc}
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