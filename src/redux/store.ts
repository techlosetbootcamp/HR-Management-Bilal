import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice"; // ✅ Ensure authSlice is imported

export const store = configureStore({
  reducer: {
    auth: authReducer, // ✅ Ensure 'auth' exists at the top level
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
