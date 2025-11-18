export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  genres?: { id: number; name: string }[];

  // appended when using append_to_response
  runtime?: number;

  credits?: {
    cast: Cast[];
    crew: Crew[];
  };

  videos?: {
    results: Video[];
  };
};

export type Cast = {
  id: number;
  name: string;
  character?: string;
  profile_path?: string | null;
};

export type Crew = {
  id: number;
  name: string;
  job: string;
};

export type Video = {
  id: string;
  key: string;
  name: string;
  site: "YouTube" | string;
  type: "Trailer" | string;
};

export type PagedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};
