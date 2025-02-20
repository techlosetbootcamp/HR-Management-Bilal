"use client";

import { usePathname } from "next/navigation";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar activePath={pathname} />

      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />
        
        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
