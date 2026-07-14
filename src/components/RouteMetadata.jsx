import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import profile from "../profile.config";

const defaultDescription =
  "Portafolio de Darwin Steven Gómez, desarrollador de software Full Stack especializado en React, Node.js, Python, Flutter, APIs REST y bases de datos.";

function setMeta(selector, attribute, value) {
  const element = document.head.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
}

function routeTitle(pathname) {
  if (pathname === "/") return "Darwin Steven Gómez | Desarrollador de Software Full Stack";
  if (pathname === "/proyectos") return "Proyectos | Darwin Steven Gómez";
  if (pathname.startsWith("/proyectos/")) return "Detalle del proyecto | Darwin Steven Gómez";
  if (pathname === "/articulos") return "Artículos | Darwin Steven Gómez";
  if (pathname.startsWith("/articulos/")) return "Detalle del artículo | Darwin Steven Gómez";
  if (pathname === "/contacto") return "Contacto | Darwin Steven Gómez";
  if (pathname === "/login") return "Iniciar sesión | BlogDarwin";
  if (pathname === "/registrar") return "Crear cuenta | BlogDarwin";
  if (pathname.startsWith("/admin")) return "Administración | BlogDarwin";
  return "Página no encontrada | BlogDarwin";
}

function RouteMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const title = routeTitle(pathname);
    const canonical = new URL(pathname, profile.website).href;
    document.title = title;
    document.documentElement.lang = "es";
    setMeta('meta[name="description"]', "content", defaultDescription);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", defaultDescription);
    setMeta('meta[property="og:url"]', "content", canonical);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", defaultDescription);
    setMeta('link[rel="canonical"]', "href", canonical);
  }, [pathname]);

  return null;
}

export default RouteMetadata;
