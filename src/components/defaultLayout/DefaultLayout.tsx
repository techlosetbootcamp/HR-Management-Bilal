"use client";

import { usePathname } from "next/navigation";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen dark:bg-[#131313]">
      <Sidebar activePath={pathname} />

      <div className="flex flex-col flex-1 dark:bg-[#131313] h-screen">
        <Header/>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
