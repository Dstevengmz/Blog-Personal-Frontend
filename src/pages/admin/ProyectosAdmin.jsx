import { useEffect, useState } from "react";
import { Table, Button, Spinner, Form, Row as RBRow, Col as RBCol, Alert } from "react-bootstrap";
import { crearProyecto, listarProyectos, crearProyectoConImagenes } from "../../services/ProyectosService";
import { alertProyectoCreado } from "../../alerts";

 function ProyectosAdmin() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [form, setForm] = useState({ titulo: "", descripcion: "", github: "", demoUrl: "" });
  const [files, setFiles] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await listarProyectos();
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.response?.data?.error || "Error al cargar proyectos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Evitar ocultar el botón cuando hay loading/error; mostramos feedback inline

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Proyectos</h3>
        <Button variant="success" onClick={() => setCreating((v) => !v)}>
          {creating ? "Cerrar" : "Nuevo proyecto"}
        </Button>
      </div>
      {loading && (
        <div className="mb-3"><Spinner animation="border" size="sm" /> Cargando...</div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      {creating && (
        <div className="mb-3">
          <Form onSubmit={async (e) => {
            e.preventDefault();
            setCreateError("");
            try {
              const userStr = localStorage.getItem("user");
              const user = userStr ? JSON.parse(userStr) : null;
              const campos = { ...form, idUsuario: user?.id };
              if (files && files.length > 0) {
                await crearProyectoConImagenes(campos, files);
              } else {
                await crearProyecto(campos);
              }
              // Éxito
              alertProyectoCreado();
              setForm({ titulo: "", descripcion: "", github: "", demoUrl: "" });
              setFiles([]);
              setCreating(false);
              await fetchData();
            } catch (err) {
              const status = err?.response?.status;
              setCreateError(
                err?.response?.data?.error ||
                  (status === 401 ? "No autorizado" : "No se pudo crear el proyecto")
              );
            }
          }}>
            {createError && <Alert variant="danger">{createError}</Alert>}
            <RBRow className="g-2">
              <RBCol md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Título</Form.Label>
                  <Form.Control value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} required />
                </Form.Group>
              </RBCol>
              <RBCol md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>GitHub</Form.Label>
                  <Form.Control value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} placeholder="https://github.com/..." />
                </Form.Group>
              </RBCol>
              <RBCol md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Demo</Form.Label>
                  <Form.Control value={form.demoUrl} onChange={(e) => setForm({ ...form, demoUrl: e.target.value })} placeholder="https://demo.com" />
                </Form.Group>
              </RBCol>
              <RBCol md={12}>
                <Form.Group className="mb-2">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control as="textarea" rows={3} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
                </Form.Group>
              </RBCol>
              <RBCol md={12}>
                <Form.Group className="mb-2">
                  <Form.Label>Imágenes (hasta 10)</Form.Label>
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
                      // Limpia el input para permitir volver a seleccionar los mismos archivos si se desea
                      e.target.value = "";
                    }}
                  />
                  {files?.length > 0 && (
                    <div className="mt-2">
                      <small className="text-muted">Seleccionadas: {files.length}/10</small>
                      <ul className="mt-1 mb-0">
                        {files.map((f, idx) => (
                          <li key={idx} className="d-flex align-items-center gap-2">
                            <span className="text-truncate" style={{ maxWidth: 260 }}>{f.name}</span>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => setFiles((prev) => prev.filter((_, i) => i !== idx))}
                            >
                              Quitar
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Form.Group>
              </RBCol>
            </RBRow>
            <div className="d-flex gap-2 mt-2">
              <Button type="submit" variant="primary">Guardar</Button>
              <Button type="button" variant="secondary" onClick={() => setCreating(false)}>Cancelar</Button>
            </div>
          </Form>
        </div>
      )}
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>GitHub</th>
            <th>Demo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-muted">No hay proyectos</td>
            </tr>
          ) : (
            rows.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.titulo}</td>
                <td>{p.github}</td>
                <td>{p.demoUrl}</td>
                <td>
                  <Button size="sm" variant="outline-primary" className="me-2">Editar</Button>
                  <Button size="sm" variant="outline-danger">Eliminar</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
export default ProyectosAdmin;