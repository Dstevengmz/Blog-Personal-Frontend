import api from "../lib/api";

/**
 * @param {{nombre: string, email: string, password: string, rol?: 'admin'|'visitante'}} payload
 * @returns {Promise<any>}
 */
export async function registrarUsuario(payload) {
	const { data } = await api.post("api/auth/registrar", payload);
	return data;
}

export default { registrarUsuario };
