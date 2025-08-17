import api from "../lib/api";

/**
 * @param {{nombre:string, email:string, asunto?:string, mensaje:string}} payload
 * @returns {Promise<any>}
 */
export async function enviarContacto(payload) {
  const { data } = await api.post("api/contacto", payload);
  return data;
}

export default { enviarContacto };
