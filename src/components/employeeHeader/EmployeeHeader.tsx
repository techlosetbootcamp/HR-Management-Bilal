"use client";
import { CirclePlus, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import SearchBar from "@/components/searchbar/Searchbar";
import { EmployeeHeaderProps } from "@/types/empoyee";



export default function EmployeeHeader({
  searchTerm,
  onSearchChange,
  showFilter,
  setShowFilter,
  isAdmin,
}: EmployeeHeaderProps) {
  return (
    <div className="flex justify-between items-center mt-3">
      <SearchBar value={searchTerm} onChange={onSearchChange} />

      <div className="flex">
        {!showFilter && isAdmin && (
          <Link
            href="/employees/addEmployee"
            className="mt-3 flex items-center mr-4 bg-customOrange text-white hover:text-customOrange dark:hover:bg-[#131313] hover:bg-white font-medium transition-all duration-300 ease-in-out border-[1px] border-customOrange px-6 py-3 rounded-lg shadow-md hover:shadow-lg"
          >
            <CirclePlus size={20} />
            <span className="ml-2 text-[16px] font-[300]">
              Add New Employee
            </span>
          </Link>
        )}

        {!showFilter && (
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="border-[1px] border-gray-300 dark:border-gray-600 bg-white dark:bg-[#131313] text-gray-900 dark:text-white flex items-center rounded-lg px-6 py-3 mr-3 mt-3"
          >
            <div className="hover:text-customOrange flex transition-all duration-300 ease-in-out">
              <SlidersHorizontal size={24} />
              <span className="ml-3 text-[16px] font-[300]">Filter</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}