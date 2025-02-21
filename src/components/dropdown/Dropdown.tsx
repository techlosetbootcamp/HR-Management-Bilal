"use client";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Profile } from "@/constants/images"; // Fallback profile image

const DropDown = () => {
  const { data: session } = useSession(); // Fetch user session
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Get user info from session
  const userName = session?.user?.name?.trim() || "Guest"; // Show user's name instead of email
  const userRole = session?.user?.role || "Employee"; // Default to 'Employee' if role is missing
  const userImage = session?.user?.image || Profile; // Use profile pic from session or fallback

  return (
    <div className="relative">
      <button
        className="flex items-center pe-1 justify-between h-12 ms-5 w-46 rounded border border-borderGrey focus:outline-none"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        <div className="flex ms-1 items-center">
          <Image
            src={userImage}
            alt="Profile pic"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="flex flex-col items-start ms-1">
            <div className="text-sm font-semibold">{userName}</div> {/* Now shows name */}
            <div className="text-xs text-customGrey">{userRole}</div>
          </div>
        </div>
        <ChevronDown
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-[-20px] mt-2 w-46 border border-borderGrey bg-customDark rounded shadow-lg">
          <ul className="bg-primaryBlack">
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
