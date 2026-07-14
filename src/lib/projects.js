export function normalizeText(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function sortProjects(projects = []) {
  const rank = (project) => {
    const title = normalizeText(project?.titulo);
    if (title.includes("causario")) return 0;
    if (title.includes("clinestetica") && (title.includes("movil") || title.includes("flutter"))) return 2;
    if (title.includes("clinestetica")) return 1;
    if (title.includes("guia") || title.includes("instructor") || title.includes("sena")) return 3;
    if (title.includes("domot") || title.includes("arduino")) return 4;
    if (title.includes("crud") && (title.includes("flask") || title.includes("mongo"))) return 5;
    return 6;
  };

  return [...projects].sort((a, b) => {
    const featuredDifference = Number(Boolean(b?.featured)) - Number(Boolean(a?.featured));
    if (featuredDifference) return featuredDifference;
    const priorityA = Number.isFinite(Number(a?.priority)) ? Number(a.priority) : Number.MAX_SAFE_INTEGER;
    const priorityB = Number.isFinite(Number(b?.priority)) ? Number(b.priority) : Number.MAX_SAFE_INTEGER;
    const priorityDifference = priorityA - priorityB;
    if (priorityDifference) return priorityDifference;
    return rank(a) - rank(b);
  });
}

export function projectTechnologies(project) {
  const raw = project?.tecnologias || project?.technologies || project?.stack;
  if (Array.isArray(raw)) return raw.filter(Boolean);
  if (typeof raw !== "string") return [];
  return [...new Set(raw.split(/[,;|]/).map((item) => item.trim()).filter(Boolean))];
}

export function projectCategory(project) {
  if (project?.category) return project.category;
  if (project?.projectType) return project.projectType;
  if (project?.tipo === "movil") return "Aplicación móvil";
  if (project?.tipo === "web") return "Aplicación web";
  return "Proyecto de software";
}

export function isLearningProject(project) {
  const title = normalizeText(project?.titulo);
  return title.includes("crud") && (title.includes("flask") || title.includes("mongo"));
}

export function validExternalUrl(value) {
  if (!value || value === "#") return "";
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

export function projectImage(project) {
  return project?.imagenes?.[0]?.thumbnailUrl || project?.imagenes?.[0]?.url || project?.imagen || "";
}
