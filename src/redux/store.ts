import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import themeReducer from './slice/themeSlice'
import employeeReducer from "./slice/employeeSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    employees: employeeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
