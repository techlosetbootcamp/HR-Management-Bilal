import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import forgotPasswordReducer from "./slice/forgotPasswordSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    forgotPassword: forgotPasswordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
