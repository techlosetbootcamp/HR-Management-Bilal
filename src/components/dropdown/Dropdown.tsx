"use client";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useDropDown } from "./useDropDown";
import { useState } from "react";

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    user,
    handleProfileClick,
    handleAboutClick,
    signOut,
    handleChangePasswordClick,
  } = useDropDown();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const userName = user?.name?.trim().slice(0, 8) || "Guest";
  const userRole = user?.role || "Employee";

  return (
    <div className="relative">
      <button
        className="flex items-center pe-1 justify-between h-12 ms-5 w-46 rounded border dark:border-gray-700 border-gray-200 focus:outline-none"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        <div className="flex justtify-center items-center w-[156px]">
          <Image
            src={user.profilePicture}
            alt="Profile pic"
            width={40}
            height={40}
            className="rounded-full object-cover w-[40px] h-[40px] "
          />
          <div className="ml-4 flex flex-col items-start">
            <div className="text-sm font-semibold">{userName}</div>
            <div className="text-xs text-customGrey">{userRole}</div>
          </div>
        </div>
        <ChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-[0px] mt-2 w-[184px] border dark:border-gray-700 border-gray-200 rounded shadow-lg dark:bg-[#131313] bg-white">
          <ul className="">
            <li
              className="px-4 py-2 hover:bg-customOrange cursor-pointer"
              onClick={handleProfileClick}
            >
              Profile
            </li>
            <li
              className="px-4 py-2 hover:bg-customOrange cursor-pointer"
              onClick={handleAboutClick}
            >
              About
            </li>
            <li
              className="px-4 py-2 hover:bg-customOrange cursor-pointer"
              onClick={handleChangePasswordClick}
            >
              Change Password
            </li>
            <div className="border-t border-gray-700"></div>
            <li
              className="px-4 py-3 hover:bg-customOrange cursor-pointer"
              onClick={() => signOut()}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown;
