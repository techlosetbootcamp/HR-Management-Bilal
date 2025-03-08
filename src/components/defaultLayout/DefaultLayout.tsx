"use client";

import { usePathname } from "next/navigation";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import { useState } from "react";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="flex relative min-h-screen dark:bg-[#131313]">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className={`fixed lg:static lg:translate-x-0 transition-transform duration-300 z-30 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar activePath={pathname} onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex flex-col flex-1 dark:bg-[#131313] min-h-screen w-full">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 lg:p-6 dark:bg-[#131313]">{children}</main>
      </div>
    </div>
  );
}