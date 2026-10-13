import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./slices/auth/authSlice";
import apartmentReducer from "./slices/apartment/apartmentSlice";
import { injectStore } from "../config/axiosInstance";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    apartment: apartmentReducer,
  },
});

injectStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
