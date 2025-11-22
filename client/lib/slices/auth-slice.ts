import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";

export interface UserState {
  user: any | null;
  token?: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error?: string | null;
}

const stored =
  typeof window !== "undefined" ? localStorage.getItem("auth") : null;
const initialState: UserState = stored
  ? {
      ...JSON.parse(stored),
      isAuthenticated: true,
      loading: false,
      error: null,
    }
  : {
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    };

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/api/auth/login", { email, password });
      return res.data; // expecting { _id, name, email, role, country, token }
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      if (typeof window !== "undefined") localStorage.removeItem("auth");
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          _id: action.payload._id,
          name: action.payload.name,
          email: action.payload.email,
          role: action.payload.role,
          country: action.payload.country,
        };
        state.token = action.payload.token;
        state.isAuthenticated = true;
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "auth",
            JSON.stringify({ user: state.user, token: state.token })
          );
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
