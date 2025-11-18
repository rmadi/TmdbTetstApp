import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';
import type {
  Movie,
  PagedResponse,
  RequestTokenResponse,
  SessionResponse,
} from '../types';

const BASE_URL = Config.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY = Config.TMDB_API_KEY;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Movies', 'Search', 'Details'],
  endpoints: builder => ({
    // ⭐ Popular Movies
    getPopularMovies: builder.query<PagedResponse<Movie>, number | void>({
      query: (page = 1) => ({
        url: '/movie/popular',
        params: { api_key: API_KEY, page },
        keepUnusedDataFor: 5000 

      }),
      providesTags: result =>
        result
          ? [
              ...result.results.map(movie => ({
                type: 'Movies' as const,
                id: movie.id,
              })),
              { type: 'Movies', id: 'LIST' },
            ]
          : [{ type: 'Movies', id: 'LIST' }],
    }),

    // ⭐ Search Movies
    searchMovies: builder.query<
      PagedResponse<Movie>,
      { query: string; page?: number }
    >({
      query: ({ query, page = 1 }) => ({
        url: '/search/movie',
        params: {
          api_key: API_KEY,
          query,
          page,
          include_adult: false,
        },
      }),
      providesTags: () => [{ type: 'Search', id: 'LIST' }],
    }),

    // ⭐ Now Playing
    getNowPlayingMovies: builder.query<PagedResponse<Movie>, number | void>({
      query: (page = 1) => ({
        url: '/movie/now_playing',
        params: { api_key: API_KEY, page },
      }),
      providesTags: result =>
        result
          ? result.results.map(m => ({ type: 'Movies', id: m.id }))
          : [{ type: 'Movies', id: 'LIST' }],
    }),

    // ⭐ Upcoming
    getUpcomingMovies: builder.query<PagedResponse<Movie>, number | void>({
      query: (page = 1) => ({
        url: '/movie/upcoming',
        params: { api_key: API_KEY, page },
      }),
      providesTags: result =>
        result
          ? result.results.map(m => ({ type: 'Movies', id: m.id }))
          : [{ type: 'Movies', id: 'LIST' }],
    }),

    // ⭐ Movie Details
    getMovieDetails: builder.query<Movie, number>({
      query: id => ({
        url: `/movie/${id}`,
        params: {
          api_key: API_KEY,
          append_to_response: 'credits,images,videos',
        },
      }),
      providesTags: (result, error, id) => [{ type: 'Details', id }],
    }),

    // ⭐ AUTH FLOW — Step 1
    createRequestToken: builder.mutation<RequestTokenResponse, void>({
      query: () => ({
        url: '/authentication/token/new',
        params: { api_key: API_KEY },
      }),
      invalidatesTags: ['Details'],
    }),

    // ⭐ AUTH FLOW — Step 2
    validateWithLogin: builder.mutation<
      RequestTokenResponse,
      { username: string; password: string; request_token: string }
    >({
      query: ({ username, password, request_token }) => ({
        url: '/authentication/token/validate_with_login',
        method: 'POST',
        params: { api_key: API_KEY },
        body: { username, password, request_token },
      }),
    }),

    // ⭐ AUTH FLOW — Step 3
    createSession: builder.mutation<SessionResponse, { request_token: string }>(
      {
        query: ({ request_token }) => ({
          url: '/authentication/session/new',
          method: 'POST',
          params: { api_key: API_KEY },
          body: { request_token },
        }),
        invalidatesTags: ['Movies', 'Search', 'Details'],
      }
    ),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useSearchMoviesQuery,
  useGetMovieDetailsQuery,
  useCreateRequestTokenMutation,
  useValidateWithLoginMutation,
  useCreateSessionMutation,
  useGetNowPlayingMoviesQuery,
  useGetUpcomingMoviesQuery,
} = tmdbApi;
