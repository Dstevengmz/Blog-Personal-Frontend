import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import AppFooter from "./AppFooter";
import RouteMetadata from "./RouteMetadata";

function Layout({ children }) {
  const location = useLocation();

  useEffect(() => {
    const targetId = location.hash.replace("#", "");
    const target = targetId ? document.getElementById(targetId) : null;
    window.requestAnimationFrame(() => {
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo({ top: 0, behavior: "auto" });
    });
  }, [location.pathname, location.hash]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <a className="skip-link" href="#contenido-principal">Saltar al contenido principal</a>
      <RouteMetadata />
      <AppNavbar />
      <main id="contenido-principal" className="pt-fixed-nav flex-grow-1 d-flex flex-column" tabIndex="-1">
        {children}
      </main>
      <AppFooter />
    </div>
  );
}

export default Layout;
