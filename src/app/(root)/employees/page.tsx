"use client";
import React from "react";
import { CirclePlus, SlidersHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";
import SearchBar from "@/components/searchbar/Searchbar";
import { toast } from "react-hot-toast";
import EmployeePage from "@/components/allEmployee/AllEmployee";

const Page = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const handleRestrictedAccess = () => {
    toast.error("You don't have access to add an employee.");
  };

  return (
    <div className="mt-[20px] me-[30px] border-[1px] dark:border-gray-700 border-gray-200 rounded-[10px] p-5">
      <div className="flex justify-between items-center">
        <SearchBar />
        <div className="flex">
          {user?.role === "ADMIN" ? (
            <Link
              href={"/employees/addEmployee"}
              className="flex bg-customOrange ease-in-out hover:text-customOrange duration-300 dark:hover:bg-[#131313] hover:bg-[#fff] border-customOrange border-[1px] hover:border-customOrange py-[11px] px-5 rounded-[10px]"
            >
              <CirclePlus />
              <div className="ml-[10px] text-[16px]">Add New Employee</div>
            </Link>
          ) : (
            <button
              onClick={handleRestrictedAccess}
              className="flex bg-gray-400 cursor-not-allowed border-gray-400 py-[11px] px-5 rounded-[10px]"
            >
              <CirclePlus />
              <div className="ml-[10px] text-[16px]">Add New Employee</div>
            </button>
          )}
          <button className="border-gray-200 hover:border-customOrange ease-in-out duration-300 hover:text-customOrange border-[1px] flex items-center ms-5 rounded-[10px] px-[22.5px] dark:border-gray-700">
            <SlidersHorizontal />
            <div className="ml-[10px] text-[16px]">Filter</div>
          </button>
        </div>
      </div>
      <div><EmployeePage/></div>
    </div>
  );
};

export default Page;
