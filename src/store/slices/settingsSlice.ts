import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Language = 'en' | 'hi';

type SettingsState = {
  language: Language;
};

const initialState: SettingsState = {
  language: 'en',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;
