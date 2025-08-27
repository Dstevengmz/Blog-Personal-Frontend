import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Container,
  Row as RBRow,
  Col as RBCol,
  Alert,
  Image,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import {
  editarProyecto,
  obtenerProyectoPorId,
} from "../../services/ProyectosService";

const EditarProyecto = () => {
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    github: "",
    demoUrl: "",
    tipo: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [files, setFiles] = useState([]);
  const [imagenes, setImagenes] = useState([]); // existentes
  const [imagenesEliminar, setImagenesEliminar] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProyecto = async () => {
      setLoading(true);
      try {
        const data = await obtenerProyectoPorId(id);
        setForm({
          titulo: data.titulo,
          descripcion: data.descripcion,
          github: data.github,
          demoUrl: data.demoUrl,
          tipo: data.tipo,
        });
        setImagenes(Array.isArray(data.imagenes) ? data.imagenes : []);
      } catch (error) {
        setError("Error al cargar el proyecto");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    obtenerProyecto();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveError("");

    const updatedProyecto = { ...form };

    try {
      const response = await editarProyecto(
        id,
        updatedProyecto,
        files,
        imagenesEliminar
      );
      if (response) {
        alert("Proyecto actualizado correctamente");
        navigate("/admin/proyectos");
      }
    } catch (error) {
      console.error("Error al actualizar el proyectossss:", error);
      setSaveError("Hubo un error al actualizar el proyecto", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Editar Proyecto</h3>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {saveError && <Alert variant="danger">{saveError}</Alert>}

      <Form onSubmit={handleSubmit}>
        <RBRow className="g-2">
          <RBCol md={6}>
            <Form.Group className="mb-2">
              <Form.Label>Título</Form.Label>
              <Form.Control
                value={form.titulo}
                onChange={handleChange}
                name="titulo"
                required
              />
            </Form.Group>
          </RBCol>

          <RBCol md={6}>
            <Form.Group className="mb-2">
              <Form.Label>GitHub</Form.Label>
              <Form.Control
                value={form.github}
                onChange={handleChange}
                name="github"
                placeholder="https://github.com/..."
              />
            </Form.Group>
          </RBCol>

          <RBCol md={6}>
            <Form.Group className="mb-2">
              <Form.Label>Demo</Form.Label>
              <Form.Control
                value={form.demoUrl}
                onChange={handleChange}
                name="demoUrl"
                placeholder="https://demo.com"
              />
            </Form.Group>
          </RBCol>
          <RBCol md={6}>
            <Form.Group className="mb-2">
              <Form.Label>Tipo Proyecto</Form.Label>
              <Form.Select
                className="form-select"
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione tipo</option>
                <option value="web">web</option>
                <option value="movil">movil</option>
              </Form.Select>
            </Form.Group>
          </RBCol>

          <RBCol md={12}>
            <Form.Group className="mb-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={form.descripcion}
                onChange={handleChange}
                name="descripcion"
              />
            </Form.Group>
          </RBCol>

          <RBCol md={12}>
            <Form.Group className="mb-2">
              <Form.Label>Imágenes actuales</Form.Label>
              {imagenes.length === 0 ? (
                <div className="text-muted">Sin imágenes</div>
              ) : (
                <div className="d-flex flex-wrap gap-3">
                  {imagenes.map((img, idx) => {
                    const marcado = imagenesEliminar.some(
                      (x) => x.url === img.url
                    );
                    return (
                        <div key={idx} className="w-140">
                        <Image
                          src={img.url}
                          thumbnail
                          alt={`img-${idx}`}
                          className="w-140 h-100px object-cover"
                        />
                        <Form.Check
                          type="checkbox"
                          label="Eliminar"
                          checked={marcado}
                          onChange={(e) => {
                            setImagenesEliminar((prev) =>
                              e.target.checked
                                ? [...prev, { url: img.url }]
                                : prev.filter((x) => x.url !== img.url)
                            );
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </Form.Group>
          </RBCol>

          <RBCol md={12}>
            <Form.Group className="mb-2">
              <Form.Label>Añadir nuevas imágenes (hasta 10)</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const incoming = Array.from(e.target.files || []);
                  setFiles((prev) => {
                    const merged = [...prev, ...incoming];
                    return merged.slice(0, 10);
                  });
                  e.target.value = "";
                }}
              />
              {files.length > 0 && (
                <div className="mt-2">
                  <small className="text-muted">
                    Seleccionadas: {files.length}/10
                  </small>
                </div>
              )}
            </Form.Group>
          </RBCol>
        </RBRow>

        <div className="d-flex gap-2 mt-2">
          <Button type="submit" variant="primary">
            Guardar cambios
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/admin/proyectos")}
          >
            Cancelar
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditarProyecto;
