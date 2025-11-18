const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/';

export function imageUri(path: string | null | undefined, size: string = 'w342'): string {
  if (!path) return '';
  return `${TMDB_IMAGE_BASE}${size}${path}`;
}
