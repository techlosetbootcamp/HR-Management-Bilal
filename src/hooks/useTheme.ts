"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setTheme, toggleTheme } from "@/redux/slice/themeSlice";

export function useTheme() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") || "light";
      dispatch(setTheme(storedTheme));
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return { theme, toggleTheme: handleToggleTheme };
}
