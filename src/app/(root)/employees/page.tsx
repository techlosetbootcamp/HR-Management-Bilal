"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchEmployees } from "@/redux/slice/employeeSlice";
import { CirclePlus, SlidersHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import SearchBar from "@/components/searchbar/Searchbar";
import AllEmployee from "@/components/allEmployee/AllEmployee";
import FilterDepatment from "@/components/filterdepartment/FilterDepartment";
import LottieAnimation from "@/components/lottieAnimation/LottieAnimation"; // Add this if you are using Lottie for loading animation

export default function EmployeePage() {
  const dispatch = useDispatch<AppDispatch>();
  
  const { employees, loading, error, filters } = useSelector(
    (state: RootState) => state.employees
  );
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false); // Toggle state for filter

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const filteredEmployees = employees.filter((emp) => {
    return (
      (!filters.department || emp.department === filters.department) &&
      (!filters.designation || emp.designation === filters.designation) &&
      (!filters.city || emp.city === filters.city) &&
      (searchTerm === "" ||
        emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#131313]">
        <LottieAnimation /> {/* Display the Lottie animation loader */}
      </div>
    );
  }

  return (
    <div className="dark:bg-[#131313]">
      <div className=" border-[1px] border-gray-700 rounded-[15px] p-4">
        <div className="flex justify-between items-center mt-3">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

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

        {error && <p className="text-red-500">{error}</p>}

        {showFilter ? (
          <FilterDepatment employees={filteredEmployees} />
        ) : (
          <>
            <div className="mt-5 grid grid-cols-7 gap-4 text-white font-semibold p-3 rounded-t-lg">
              <div>Employee</div>
              <div>Employee ID</div>
              <div>Department</div>
              <div>Designation</div>
              <div>Type</div>
              <div>Status</div>
              {isAdmin ? (
                <div className="text-center">Action</div>
              ) : (
                <div>City</div>
              )}
            </div>
            <hr className="border-gray-700" />
            <AllEmployee isAdmin={isAdmin} employees={filteredEmployees} />
          </>
        )}
      </div>
    </div>
  );
}
