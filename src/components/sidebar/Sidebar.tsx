"use client";

import Link from "next/link";
import ModeChanger from "../modeChanger/ModeChanger";
import Image from "next/image";
import { navebarLogo } from "@/constants/images";
import { SIDE_BAR_LINKS } from "@/constants/sidebarLinks";
import { X } from "lucide-react";

interface SidebarProps {
  activePath: string;
  onClose: () => void;
}

export default function Sidebar({ activePath, onClose }: SidebarProps) {
  return (
    <div className="flex flex-col w-[280px] h-screen rounded-r-2xl text-black px-6 lg:px-10 py-12 dark:bg-[#A2A1A80D] dark:text-white bg-gray-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={navebarLogo}
            alt="Logo"
            className="object-cover w-[40px] h-[40px]"
          />
          <span className="font-[600] mt-4 text-[14px]">HR SEARCH</span>
        </div>
        
        {/* Close button for mobile */}
        <button 
          onClick={onClose}
          className="lg:hidden p-2 hover:bg-gray-700 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
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
        <div className="mt-[300px]">
          <ModeChanger />
        </div>
      </nav>
    </div>
  );
}