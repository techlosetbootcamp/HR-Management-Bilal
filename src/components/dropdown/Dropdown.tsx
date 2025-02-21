"use client";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Profile } from "@/constants/images";

const DropDown = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Get user info from session
  const userName = session?.user?.name?.trim().slice(0, 8) || "Guest"; // Show first eight digits of user's name
  const userRole = session?.user?.role || "Employee"; // Default to 'Employee' if role is missing
  const userImage = session?.user?.image || Profile; // Use profile pic from session or fallback

  return (
    <div className="relative">
      <button
        className="flex items-center pe-1 justify-between h-12 ms-5 w-46 rounded border dark:border-gray-700 border-gray-200 focus:outline-none"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        <div className="flex justtify-center items-center w-[156px]">
          <Image
            src={userImage}
            alt="Profile pic"
            width={40}
            height={40}
            className="rounded-3xl"
          />
          <div className="ml-4 flex flex-col items-start">
            <div className="text-sm font-semibold">{userName}</div> {/* Now shows first eight digits of name */}
            <div className="text-xs text-customGrey">{userRole}</div>
          </div>
        </div>
        <ChevronDown
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-[0px] mt-2 w-[184px] border dark:border-gray-700 border-gray-200 rounded shadow-lg">
          <ul className="">
            <li className="px-4 py-2 hover:bg-customOrange cursor-pointer">About</li>
            <li className="px-4 py-2 hover:bg-customOrange cursor-pointer">Profile Info</li>
            <div className="border-t border-borderGrey"></div>
            <li className="px-4 py-3 hover:bg-customOrange cursor-pointer">
              <button onClick={() => signOut()}>Sign out</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown;
