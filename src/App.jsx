import { lazy, Suspense } from "react";
import { Container, Spinner } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Proyectos = lazy(() => import("./pages/Proyectos"));
const ProyectoDetalle = lazy(() => import("./pages/ProyectoDetalle"));
const Articulos = lazy(() => import("./pages/Articulos"));
const ArticuloDetalle = lazy(() => import("./pages/ArticuloDetalle"));
const Contacto = lazy(() => import("./pages/Contacto"));
const Login = lazy(() => import("./pages/Login"));
const RecuperarContrasena = lazy(() => import("./pages/RecuperarContrasena"));
const RestablecerContrasena = lazy(() => import("./pages/RestablecerContrasena"));
const Registrar = lazy(() => import("./pages/Registrar"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const ProyectosAdmin = lazy(() => import("./pages/admin/ProyectosAdmin"));
const EditarProyecto = lazy(() => import("./pages/admin/EditarProyecto"));
const ArticulosAdmin = lazy(() => import("./pages/admin/ArticulosAdmin"));
const UsuariosAdmin = lazy(() => import("./pages/admin/UsuariosAdmin"));

function RouteFallback() {
  return (
    <Container className="route-fallback" role="status" aria-live="polite">
      <Spinner animation="border" size="sm" aria-hidden="true" />
      <span>Cargando página…</span>
    </Container>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="/proyectos/:id" element={<ProyectoDetalle />} />
            <Route path="/articulos" element={<Articulos />} />
            <Route path="/articulos/:id" element={<ArticuloDetalle />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
            <Route path="/restablecer-contrasena/:token" element={<RestablecerContrasena />} />
            <Route path="/registrar" element={<Registrar />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/admin" element={<ProtectedRoute roles={["admin"]}><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/proyectos" element={<ProtectedRoute roles={["admin"]}><ProyectosAdmin /></ProtectedRoute>} />
            <Route path="/admin/editarproyecto/:id" element={<ProtectedRoute roles={["admin"]}><EditarProyecto /></ProtectedRoute>} />
            <Route path="/admin/articulos" element={<ProtectedRoute roles={["admin"]}><ArticulosAdmin /></ProtectedRoute>} />
            <Route path="/admin/usuarios" element={<ProtectedRoute roles={["admin"]}><UsuariosAdmin /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
