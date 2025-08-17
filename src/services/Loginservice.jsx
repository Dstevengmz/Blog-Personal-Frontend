import api from "../lib/api";

/**
 * @param {{email:string, password:string}} payload
 */
export async function iniciarSesion(payload) {
  const { data } = await api.post("api/auth/iniciarsesion", payload);
  return data;
}

export default { iniciarSesion };
