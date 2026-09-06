import type { Post } from "../types";

function toArray(v: unknown): string[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v as string];
}

function toISODate(dateStr: unknown): string {
  if (!dateStr) return "";
  const d = new Date(dateStr as string);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0] as string;
}

function toBoolean(value: unknown): boolean {
  return value === true || value === "true";
}

function asset(path: string): string {
  return path.startsWith("/") || path.startsWith("http") ? path : `/${path}`;
}

function absoluteUrl(path = "/", url: string): string {
  if (path.startsWith("http")) return path;
  if (path === "/" || path === "") return `${url}/`;
  return `${url}/${path.replace(/^\/+/, "")}`;
}

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function excerpt(post: Post): string {
  const text = stripHtml(post.body);
  return `${text.slice(0, 150)}${text.length > 150 ? " ..." : ""}`;
}

function escapeXml(value: string): string {
  return value.replace(/[<>&'\"]/g, character => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '"': "&quot;",
    };
    return entities[character] as string;
  });
}

function joinPath(...parts: string[]) {
  return (
    "/" +
    parts
      .filter(Boolean)
      .map(part => encodeURIComponent(part))
      .join("/")
  );
}

export {
  toArray,
  toISODate,
  toBoolean,
  asset,
  absoluteUrl,
  stripHtml,
  excerpt,
  escapeXml,
  joinPath,
};