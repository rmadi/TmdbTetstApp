export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  vote_average: number;
  release_date?: string;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
};

export type PagedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type RequestTokenResponse = {
  success: boolean;
  expires_at: string;
  request_token: string;
};

export type SessionResponse = {
  success: boolean;
  session_id: string;
};
