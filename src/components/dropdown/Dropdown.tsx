"use client";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Profile } from "@/constants/images";
import { useRouter } from "next/navigation";

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string; profilePicture: string } | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.user?.email) return;
  
      try {
        const res = await fetch(`/api/auth/register?email=${session.user.email}`);
        if (!res.ok) {
          console.error("Failed to fetch user:", res.statusText); // Debugging log
          throw new Error("Failed to fetch user");
        }
  
        const userData = await res.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  
    fetchUser();
  }, [session]);
  const handleProfileClick = () => {
    if (!session?.user?.email) {
      console.error("❌ No user email found in session!");
      alert("User email not found");
      return;
    }

    router.push(`/profile`);
  };

  const handleAboutClick = async () => {
    if (!session?.user?.email) {
      console.error("❌ No user email found in session!");
      alert("User email not found");
      return;
    }

    try {
      const res = await fetch(`/api/employee?email=${session.user.email}`);
      if (!res.ok) throw new Error("Employee not found");

      const employee = await res.json();
      console.log("✅ Employee fetched:", employee);

      router.push(`/employees/${employee.id}`);
    } catch (error) {
      console.error("❌ Error fetching employee details:", error);
      alert("Failed to fetch profile information");
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const userName = user?.name?.trim().slice(0, 8) || "Guest";
  const userRole = user?.role || "Employee";
  const userImage = user?.profilePicture || Profile;

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
            <li className="px-4 py-2 hover:bg-customOrange cursor-pointer" onClick={handleProfileClick}>
              Profile
            </li>
            <li className="px-4 py-2 hover:bg-customOrange cursor-pointer" onClick={handleAboutClick}>
              About
            </li>
            <div className="border-t border-borderGrey"></div>
            <li className="px-4 py-3 hover:bg-customOrange cursor-pointer" onClick={() => signOut()}>
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown;