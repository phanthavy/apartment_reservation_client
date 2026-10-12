import api from "@/config/axiosInstance";
import { apipath } from "@/constant/apiPath";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

type User = {
  id: number;
  email: string;
  role: string;
  name: string;
};

type AuthState = {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

export const storage = {
  setItem: (key: string, value: string) =>
    Platform.OS === "web"
      ? Promise.resolve(localStorage.setItem(key, value))
      : SecureStore.setItemAsync(key, value),
  getItem: (key: string) =>
    Platform.OS === "web"
      ? Promise.resolve(localStorage.getItem(key))
      : SecureStore.getItemAsync(key),
  removeItem: (key: string) =>
    Platform.OS === "web"
      ? Promise.resolve(localStorage.removeItem(key))
      : SecureStore.deleteItemAsync(key),
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (form: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await api.post(apipath.login, form);
      await storage.setItem("token", res.data.token);
      await storage.setItem("user", JSON.stringify(res.data.data));
      return { token: res.data.token as string, user: res.data.data as User };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ?? "something wrong",
      );
    }
  },
);

export const loadAuth = createAsyncThunk("auth/load", async () => {
  const token = await storage.getItem("token");
  const user = await storage.getItem("user");
  return { token, user: user ? (JSON.parse(user) as User) : null };
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await storage.removeItem("token");
  await storage.removeItem("user");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loadAuth.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
