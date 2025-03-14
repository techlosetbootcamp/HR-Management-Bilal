import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import themeReducer from "./slice/themeSlice";
import employeeReducer from "./slice/employeeSlice";
// import employeeDetailsReducer from "./slice/employeeDetailsSlice";
import attendanceReducer from "./slice/attandanceSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    employees: employeeReducer,
    attandance: attendanceReducer,
    // employeeDetails: employeeDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
