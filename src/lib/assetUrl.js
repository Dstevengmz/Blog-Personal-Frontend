export function assetUrl(pathOrUrl) {
  if (!pathOrUrl) return '';
  // If it's already an absolute URL (Cloudinary), return as-is
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const base = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '').replace(/\/api\/?$/, '');
  return `${base}${pathOrUrl}`;
}

export default assetUrl;
