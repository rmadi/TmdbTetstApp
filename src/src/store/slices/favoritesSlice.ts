import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from '../../types';

type FavoritesState = {
  ids: number[];
  items: Record<number, Movie>;
};

const initialState: FavoritesState = {
  ids: [],
  items: {},
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<Movie>) {
      const movie = action.payload;
      if (!state.ids.includes(movie.id)) {
        state.ids.push(movie.id);
      }
      state.items[movie.id] = movie;
    },
    removeFavorite(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.ids = state.ids.filter(existingId => existingId !== id);
      delete state.items[id];
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
