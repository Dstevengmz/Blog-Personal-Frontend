export function assetUrl(pathOrUrl) {
  if (!pathOrUrl) return '';
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const base = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '').replace(/\/api\/?$/, '');
  return `${base}${pathOrUrl}`;
}

// Inserta transformaciones en URLs de Cloudinary. Devuelve la URL intacta si no aplica.
export function cloudinaryTransform(url, transform) {
  if (!url || !transform) return url || '';
  if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
  const marker = '/upload/';
  const idx = url.indexOf(marker);
  const after = url.slice(idx + marker.length);
  // Si ya tiene transformaciones (segmento con parámetros Cloudinary), no duplicar
  if (/^[a-z][a-z0-9]*_/.test(after)) return url;
  return url.slice(0, idx + marker.length) + transform + '/' + after;
}

export default assetUrl;
