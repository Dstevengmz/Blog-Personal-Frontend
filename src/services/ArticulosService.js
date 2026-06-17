import api from "../lib/api";

export async function listarArticulos(limit) {
  const params = new URLSearchParams();
  if (limit) params.set("limit", limit);
  const query = params.toString();
  const url = query ? `api/listararticulos?${query}` : "api/listararticulos";
  const { data } = await api.get(url);
  return data;
}

export async function obtenerArticuloPorId(id) {
  const { data } = await api.get(`api/buscararticulo/${id}`);
  return data;
}

export default { listarArticulos, obtenerArticuloPorId };
