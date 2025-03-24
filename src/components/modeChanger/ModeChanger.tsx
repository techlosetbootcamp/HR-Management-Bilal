"use client";

import { toggleTheme } from "@/redux/slice/themeSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { Sun, Moon } from "lucide-react";

export default function ModeChanger() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state: RootState) => state.theme.theme);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="flex items-center w-40 p-1 rounded-xl bg-gray-800 transition-all duration-300"
    >
      <div
        className={`flex items-center justify-center w-1/2 p-2 rounded-xl transition-all duration-300 ${
          theme === "light" ? "bg-orange-500 text-white" : "text-white"
        }`}
      >
        <Sun className="w-5 h-5 text-white" />
        <span className="ml-1 text-sm font-medium">Light</span>
      </div>

      <div
        className={`flex items-center justify-center w-1/2 p-2 rounded-[10px] transition-all duration-300 ${
          theme === "dark" ? "bg-orange-500 text-white" : "text-white"
        }`}
      >
        <Moon className="w-5 h-5" />
        <span className="ml-1 text-sm font-medium">Dark</span>
      </div>
    </button>
  );
}
