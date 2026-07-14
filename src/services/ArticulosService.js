import api from "../lib/api";

export async function listarArticulos(limit, options = {}) {
  const params = new URLSearchParams();
  if (limit) params.set("limit", limit);
  const query = params.toString();
  const url = query ? `api/listararticulos?${query}` : "api/listararticulos";
  const { data } = await api.get(url, { signal: options.signal });
  return data;
}

export async function obtenerArticuloPorId(id, options = {}) {
  const { data } = await api.get(`api/buscararticulo/${id}`, { signal: options.signal });
  return data;
}

export default { listarArticulos, obtenerArticuloPorId };
