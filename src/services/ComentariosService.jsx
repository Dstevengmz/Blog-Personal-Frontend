import api from "../lib/api";

export async function listarComentarios(idProyecto, options = {}) {
  const { data } = await api.get(`api/proyecto/${idProyecto}/comentarios`, { signal: options.signal });
  return data;
}

export async function crearComentario(idProyecto, contenido) {
  const { data } = await api.post(`api/proyecto/${idProyecto}/comentarios`, { contenido });
  return data;
}

export default { listarComentarios, crearComentario };
