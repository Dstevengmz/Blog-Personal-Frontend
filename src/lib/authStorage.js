const TOKEN_KEY = "token";
const USER_KEY = "user";

/**
 * Obtiene la sesión almacenada y descarta valores corruptos o incompletos.
 * El rol guardado solo controla la interfaz; la autorización real corresponde al backend.
 */
export function getStoredUser() {
  try {
    const user = JSON.parse(localStorage.getItem(USER_KEY) || "null");
    if (!user || !Number.isFinite(Number(user.id)) || !["admin", "visitante"].includes(user.rol)) {
      return null;
    }
    return user;
  } catch {
    return null;
  }
}

export function getStoredToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  return typeof token === "string" && token.length > 0 ? token : null;
}

export function saveAuthSession(token, user) {
  if (!token || !user) throw new Error("La respuesta de autenticación está incompleta");
  const publicUser = {
    id: user.id,
    nombre: user.nombre,
    email: user.email,
    rol: user.rol,
  };
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(publicUser));
}

export function clearAuthSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
