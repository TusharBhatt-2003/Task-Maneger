import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  username: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const storedUser = localStorage.getItem("authUser");

const initialState: AuthState = storedUser
  ? JSON.parse(storedUser)
  : { isAuthenticated: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("authUser", JSON.stringify(state)); // Persist login
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("authUser"); // Remove from storage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
