import axios from "axios";

let store: any;

export const injectStore = (_store: any) => {
  store = _store;
};

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = store?.getState().auth.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
