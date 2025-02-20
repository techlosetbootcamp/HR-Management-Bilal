import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import themeReducer from './slice/themeSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
