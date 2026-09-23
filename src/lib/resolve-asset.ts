const HASHED = /^\/assets\/(.+)-[A-Za-z0-9_-]{6,}\.(webp|png|jpg|jpeg|svg|avif)$/;

export function resolveAsset(src: string): string {
  if (!src) return src;
  
  // Older saved content may reference hashed build asset paths
  const m = HASHED.exec(src);
  if (m) {
    return `/faii/${m[1]}.${m[2]}`;
  }

  // Dev-only source paths or other legacy paths
  if (/^\/?src\/assets\//.test(src) || /^\/assets\//.test(src)) {
    const file = src.split("/").pop();
    if (file) return `/faii/${file}`;
  }
  
  return src;
}
