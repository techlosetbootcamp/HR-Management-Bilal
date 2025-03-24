import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import themeReducer from "./slice/themeSlice";
import employeeReducer from "./slice/employeeSlice";
import leaveReducer from "./slice/leaveSlice";
import attendanceReducer from "./slice/attandanceSlice";
import projectReducer from "./slice/projectSlice";
import notificationReducer from "./slice/notificationSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    employees: employeeReducer,
    attandance: attendanceReducer,
    leave: leaveReducer,
    projects: projectReducer,
    notifications: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
