import api from "../lib/api";

/**
 * @param {{email:string, password:string}} payload
 */
export async function iniciarSesion(payload) {
  const { data } = await api.post("api/auth/iniciarsesion", payload);
  return data;
}

export async function solicitarRecuperacion(email) {
  const { data } = await api.post("api/auth/recuperar-contrasena", { email });
  return data;
}

export async function restablecerContrasena(token, password) {
  const { data } = await api.post("api/auth/restablecer-contrasena", { token, password });
  return data;
}

export default { iniciarSesion, solicitarRecuperacion, restablecerContrasena };
