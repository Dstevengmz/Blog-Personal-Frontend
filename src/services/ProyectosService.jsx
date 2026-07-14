import api from "../lib/api";

export async function crearProyecto(payload) {
	const { data } = await api.post("api/agregaproyecto", payload);
	return data;
}

export async function listarProyectos(tipo, limit, options = {}) {
  const params = new URLSearchParams();
  if (tipo) params.set('tipo', tipo);
  if (limit) params.set('limit', limit);
  const query = params.toString();
  const url = query ? `api/listarproyectos?${query}` : "api/listarproyectos";
  const { data } = await api.get(url, { signal: options.signal });
  return data;
}
export async function eliminarProyecto(id) {
	const { data } = await api.delete(`api/eliminarproyecto/${id}`);
	return data;
}

export async function crearProyectoConImagenes(campos = {}, imagenes = []) {
	const formData = new FormData();
	Object.entries(campos).forEach(([k, v]) => {
		if (v !== undefined && v !== null) formData.append(k, v);
	});
	(imagenes || []).slice(0, 10).forEach((file) => formData.append("imagenes", file));
	const { data } = await api.post("api/imagen", formData, {
		headers: { "Content-Type": "multipart/form-data" },
	});
	return data;
}
export async function obtenerProyectoPorId(id, options = {}) {
  const { data } = await api.get(`api/buscarproyecto/${id}`, { signal: options.signal });
  return data;
}

export async function editarProyecto(id, campos, imagenes = [], imagenesEliminar = []) {
  const formData = new FormData();

  Object.entries(campos).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  (imagenes || []).forEach((file) => {
    formData.append("imagenes", file);
  });

  (imagenesEliminar || []).forEach((img) => {
    formData.append("imagenesEliminar", JSON.stringify(img));
  });

  try {
    const { data } = await api.put(`api/editarproyecto/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.error("Error al actualizar el proyecto", error);
    throw error;
  }
}



export default { crearProyecto,editarProyecto,listarProyectos, crearProyectoConImagenes, obtenerProyectoPorId };
