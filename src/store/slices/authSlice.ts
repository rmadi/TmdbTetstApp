import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  sessionId?: string;
  username?: string;
};

const initialState: AuthState = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<{ sessionId: string; username?: string }>) {
      state.sessionId = action.payload.sessionId;
      state.username = action.payload.username;
    },
    signOut(state) {
      state.sessionId = undefined;
      state.username = undefined;
    },
  },
});

export const { setSession, signOut } = authSlice.actions;
export default authSlice.reducer;
