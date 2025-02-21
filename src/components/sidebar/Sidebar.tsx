"use client";

import Link from "next/link";
import ModeChanger from "../modeChanger/ModeChanger";
import Image from "next/image";
import { navebarLogo } from "@/constants/images";
import { SIDE_BAR_LINKS } from "@/constants/sidebarLinks";

export default function Sidebar({ activePath }: { activePath: string }) {
  return (
    <div className="flex flex-col w-[280px] min-h-screen rounded-2xl text-black p-6 dark:bg-[#A2A1A80D] dark:text-white bg-gray-300">
      <div className="flex">
        <Image
          src={navebarLogo}
          alt="Logo"
          className="object-cover w-[32px] h-[32px] "
        />
        <span className="font-[600] mt-4 text-[14px]">HR SEARCH</span>
      </div>
      <nav className="mt-4 flex-1">
        {SIDE_BAR_LINKS.map(({ name, path, icon: Icon }) => (
          <Link
            key={name}
            href={path}
            className={`relative flex items-center px-4 py-2 my-2 rounded-lg transition-colors ${
              activePath === path
                ? "dark:bg-[#131313] dark:text-customOrange text-gray-700 font-semibold bg-customOrange "
                : "dark:hover:bg-[#131313] hover:bg-gray-200"
            }`}
          >
            {activePath === path && (
              <span className="absolute left-0 top-0 h-full w-1 bg-orange-500 rounded-r-lg"></span>
            )}

            <Icon
              className={`w-6 h-6 mr-3 ${
                activePath === path
                  ? "dark:text-customOrange text-[#131313] "
                  : "dark:text-gray-200"
              }`}
            />
            {name}
          </Link>
        ))}
      </nav>

      <div className="mt-auto flex justify-center ">
        <ModeChanger />
      </div>
    </div>
  );
}
