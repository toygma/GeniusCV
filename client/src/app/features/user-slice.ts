import type { IUser } from "@/types/user.type";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setisAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export default userSlice.reducer;
export const { setUser, setisAuthenticated, setLoading, clearUser } =
  userSlice.actions;
