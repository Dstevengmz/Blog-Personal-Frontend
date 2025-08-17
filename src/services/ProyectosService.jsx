import api from "../lib/api";

export async function crearProyecto(payload) {
	const { data } = await api.post("api/agregaproyecto", payload);
	return data;
}

export async function listarProyectos() {
	const { data } = await api.get("api/listarproyectos");
	return data;
}

export async function crearProyectoConImagenes(campos = {}, imagenes = []) {
	const formData = new FormData();
	Object.entries(campos).forEach(([k, v]) => {
		if (v !== undefined && v !== null) formData.append(k, v);
	});
	(imagenes || []).slice(0, 5).forEach((file) => formData.append("imagenes", file));
	const { data } = await api.post("api/imagen", formData, {
		headers: { "Content-Type": "multipart/form-data" },
	});
	return data;
}
export async function obtenerProyectoPorId(id) {
  const { data } = await api.get(`api/buscarproyecto/${id}`);
  return data;
}

export default { crearProyecto, listarProyectos, crearProyectoConImagenes, obtenerProyectoPorId };
