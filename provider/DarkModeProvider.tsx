"use client";

import { useTheme } from "@/hooks/useTheme"

export function DarkProvider({ children }: { children: React.ReactNode }) {
  useTheme();
  
  return (
    <div className="min-h-screen bg-white dark:bg-[#131313] text-black dark:text-white">
      {children}
    </div>
  );
}
