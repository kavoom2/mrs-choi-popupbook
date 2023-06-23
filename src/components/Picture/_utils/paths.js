const regex = /\.(jpe?g|png)$/;

export function getWebpPath(src) {
  if (typeof src !== "string") return null;
  return src.replace(regex, ".webp");
}
