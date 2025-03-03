"use client";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Profile } from "@/constants/images";
import { useRouter } from "next/navigation";

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleProfileClick = async () => {
    console.log("🔹 Profile Info button clicked!");

    if (!session?.user?.email) {
      console.error("❌ No user email found in session!");
      alert("User email not found");
      return;
    }

    try {
      // Fetch employee data using email instead of ID
      const res = await fetch(
        `/api/employee/profile?email=${session.user.email}`
      );

      if (!res.ok) throw new Error("Employee not found");

      const employee = await res.json();
      console.log("✅ Employee fetched:", employee);

      // Navigate to employee profile page
      router.push(`/employees/${employee.id}`);
    } catch (error) {
      console.error("❌ Error fetching employee details:", error);
      alert("Failed to fetch profile information");
    }
  };
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Get user info from session
  const userName = session?.user?.name?.trim().slice(0, 8) || "Guest"; // Show first eight digits of user's name
  const userRole = session?.user?.role || "Employee"; // Default to 'Employee' if role is missing
  const userImage = session?.user?.image || Profile; // Use profile pic from session or fallback

  return (
    <div className="relative ">
      <button
        className="flex items-center pe-1 justify-between h-12 ms-5 w-46 rounded border dark:border-gray-700 border-gray-200 focus:outline-none "
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
            <div className="text-sm font-semibold">{userName}</div>{" "}
            {/* Now shows first eight digits of name */}
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
            <li className="px-4 py-2 hover:bg-customOrange cursor-pointer">
              About
            </li>
            <li
              className="px-4 py-2 hover:bg-customOrange cursor-pointer"
              onClick={handleProfileClick}
            >
              Profile
            </li>
            <div className="border-t border-borderGrey"></div>
            <li
              className="px-4 py-3 hover:bg-customOrange cursor-pointer "
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
