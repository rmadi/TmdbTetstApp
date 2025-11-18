
export const imageUri = (path?: string | null, size: string = "w500") => {
  if (!path) return undefined;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
