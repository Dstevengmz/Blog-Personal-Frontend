import { useEffect, useState } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import api from "../../lib/api";

function ArticulosAdmin() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/articulo/listararticulos");
      setRows(data || []);
    } catch {
      setError("Error al cargar artículos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Artículos</h3>
        <Button variant="success">Nuevo artículo</Button>
      </div>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.titulo}</td>
              <td>
                <Button size="sm" variant="outline-primary" className="me-2">Editar</Button>
                <Button size="sm" variant="outline-danger">Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default ArticulosAdmin;