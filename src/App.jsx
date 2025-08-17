import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Proyectos from "./pages/Proyectos";
import ProyectoDetalle from "./pages/ProyectoDetalle";
import Articulos from "./pages/Articulos";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import ProyectosAdmin from "./pages/admin/ProyectosAdmin";
import ArticulosAdmin from "./pages/admin/ArticulosAdmin";
import UsuariosAdmin from "./pages/admin/UsuariosAdmin";
import Contacto from "./pages/Contacto";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/proyectos/:id" element={<ProyectoDetalle />} />
          <Route path="/articulos" element={<Articulos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/proyectos"
            element={
              <ProtectedRoute roles={["admin"]}>
                <ProyectosAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/articulos"
            element={
              <ProtectedRoute roles={["admin"]}>
                <ArticulosAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/usuarios"
            element={
              <ProtectedRoute roles={["admin"]}>
                <UsuariosAdmin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
