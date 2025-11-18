import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';
import type { Movie, PagedResponse, RequestTokenResponse, SessionResponse } from '../types';

const BASE_URL = Config.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY = Config.TMDB_API_KEY;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getPopularMovies: builder.query<PagedResponse<Movie>, number | void>({
      query: (page = 1) => ({
        url: '/movie/popular',
        params: { api_key: API_KEY, page },
      }),
    }),
    searchMovies: builder.query<PagedResponse<Movie>, { query: string; page?: number }>({
      query: ({ query, page = 1 }) => ({
        url: '/search/movie',
        params: {
          api_key: API_KEY,
          query,
          page,
          include_adult: false,
        },
      }),
    }),
    getMovieDetails: builder.query<Movie, number>({
      query: id => ({
        url: `/movie/${id}`,
        params: {
          api_key: API_KEY,
          append_to_response: 'credits,images',
        },
      }),
    }),
    createRequestToken: builder.mutation<RequestTokenResponse, void>({
      query: () => ({
        url: '/authentication/token/new',
        params: { api_key: API_KEY },
      }),
    }),
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
    createSession: builder.mutation<SessionResponse, { request_token: string }>({
      query: ({ request_token }) => ({
        url: '/authentication/session/new',
        method: 'POST',
        params: { api_key: API_KEY },
        body: { request_token },
      }),
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useSearchMoviesQuery,
  useGetMovieDetailsQuery,
  useCreateRequestTokenMutation,
  useValidateWithLoginMutation,
  useCreateSessionMutation,
} = tmdbApi;
