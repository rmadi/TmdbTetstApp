import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../types';

type State = {
  items: Movie[];
};

const initialState: State = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Movie>) => {
      if (!Array.isArray(state.items)) {
        state.items = [];
      }
      const exists = state.items.find(m => m.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },

    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(m => m.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
