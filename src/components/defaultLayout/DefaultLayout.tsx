"use client";

import { usePathname } from "next/navigation";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import { useState } from "react";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen dark:bg-[#131313]">
      {/* Sidebar (Fixed, No Scroll) */}
      <div className={`h-full fixed lg:static w-[280px] dark:bg-[#A2A1A80D] bg-gray-300 overflow-hidden transition-transform duration-300 z-30 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <Sidebar activePath={pathname} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Right Side (Scrollable Content) */}
      <div className="flex flex-col flex-1 h-screen w-full overflow-y-auto">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 lg:p-6 dark:bg-[#131313] h-full">{children}</main>
      </div>
    </div>
  );
}
