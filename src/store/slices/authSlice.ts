/* eslint-disable no-param-reassign */
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isLoggedIn: boolean;
  role: string;
}

/**
 * Default state object with initial values.
 */
const initialState: AuthState = {
  isLoggedIn: true,
  role: 'manufacturer',
} as const;

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const authSlice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    setIsLoggedIn: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.isLoggedIn>
    ) => {
      state.isLoggedIn = action.payload;
    },
    setRole: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.role>
    ) => {
      state.role = action.payload;
    },
  },
});

// A small helper of auth state for `useSelector` function.
export const getAuthState = (state: { auth: AuthState }) => state.auth;

// Exports all actions
export const { setIsLoggedIn, setRole } = authSlice.actions;

export default authSlice.reducer;
