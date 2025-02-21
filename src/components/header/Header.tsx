"use client";

import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import Link from "next/link";
import SearchBar from "../searchbar/Searchbar";
import DropDown from "../dropdown/Dropdown";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Header = () => {
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
    <div className="h-[82px] pb-[10px] my-[15px] sticky top-0 z-[99] flex items-center justify-between pe-[50px] ms-[10px]">
      <div className="flex items-center">
        <div className="flex flex-col ml-6">
          {firstVisit ? (
            <>
              <h2 className="text-[20px] font-semibold">Hello {userName}</h2>
              <p className="text-[14px] text-customGrey">Have a good day!</p>
            </>
          ) : (
            <>
              <h2 className="text-[20px] font-semibold">{currentPage}</h2>
              <p className="text-[14px] text-customGrey">
                You are now on the {currentPage} page.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-5">
        <SearchBar
        />

        <Link
          href="/notifications"
          className="bg-lightGreyShade w-[50px] h-[50px] flex items-center justify-center rounded-[10px]"
          aria-label="Notifications"
        >
          <Bell className="h-6 w-6"/>
        </Link>

        <div className="w-[184px] flex justify-end items-end">
          <DropDown />
        </div>
      </div>
    </div>
  );
};

export default Header;
