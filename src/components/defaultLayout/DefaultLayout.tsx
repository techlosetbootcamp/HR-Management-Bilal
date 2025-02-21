"use client";

import { usePathname } from "next/navigation";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";

export default function DefaultLayout({
  children,
  heading,
  description,
}: {
  children: React.ReactNode;
  heading: string;
  description: string;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#131313] p-4">
      <Sidebar activePath={pathname} />

      <div className="flex flex-col flex-1 bg-[#131313]">
        <Header 
        heading={heading}
        description={description}/>
        
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
