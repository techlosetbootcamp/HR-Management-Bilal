"use client";

import React, { useEffect, useState } from "react";
import { Bell, Menu } from "lucide-react";
import Link from "next/link";
import SearchBar from "../searchbar/Searchbar";
import DropDown from "../dropdown/Dropdown";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
interface HeaderProps {
  onMenuClick: () => void;
}
const Header =({ onMenuClick }: HeaderProps) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [firstVisit, setFirstVisit] = useState(true);

  useEffect(() => {
    if (pathname !== "/") {
      setFirstVisit(false);
    }
  }, [pathname]);

  // Format page name
  const formatPageName = (path: string) => {
    return path
      .replace("/", "") // Remove leading slash
      .replace(/-/g, " ") // Replace dashes with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()) || "Dashboard"; // Capitalize first letter
  };

  const currentPage = formatPageName(pathname);
  const userName = session?.user?.name || "User";

  return (
    <div className="h-[82px] pb-[10px] my-[15px] sticky top-0 z-[99] flex items-center justify-between px-4 lg:px-[50px] bg-[#131313]">
      <div className="flex items-center">
        {/* Menu button for mobile */}
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-700 rounded-full lg:hidden mr-2"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex flex-col ml-2 lg:ml-6">
          {firstVisit ? (
            <>
              <h2 className="text-[18px] lg:text-[20px] font-semibold">Hello {userName}</h2>
              <p className="text-[12px] lg:text-[14px] text-customGrey">Have a good day!</p>
            </>
          ) : (
            <>
              <h2 className="text-[18px] lg:text-[20px] font-semibold">{currentPage}</h2>
              <p className="text-[12px] lg:text-[14px] text-customGrey">
                You are now on the {currentPage} page.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-5">
        <div className="hidden md:block">
          <SearchBar />
        </div>

        <Link
          href="/notifications"
          className="bg-lightGreyShade w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] flex items-center justify-center rounded-[10px]"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 lg:h-6 lg:w-6"/>
        </Link>

        <div className="w-[120px] lg:w-[184px] flex justify-end items-end">
          <DropDown />
        </div>
      </div>
    </div>
  );
};

export default Header;
