"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchEmployees } from "@/redux/slice/employeeSlice";
import { CirclePlus } from "lucide-react";
import { useSession } from "next-auth/react";
import FilterComponent from "@/components/filter/Filter";
import Link from "next/link";
import SearchBar from "@/components/searchbar/Searchbar";
import AllEmployee from "@/components/allEmployee/AllEmployee";

export default function EmployeePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { employees, loading, error, filters } = useSelector((state: RootState) => state.employees);
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <div className="dark:bg-[#131313]">
      <div className="mt-[20px] border-[1px] border-gray-700 rounded-[10px] p-2">
        <div className="flex justify-between items-center mt-3">
          <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

          <div className="flex">
            {isAdmin && (
              <Link
              href="/employees/addEmployee"
              className="mt-3 flex items-center mr-10 bg-customOrange text-white hover:text-customOrange dark:hover:bg-[#131313] hover:bg-white font-medium transition-all duration-300 ease-in-out border-[1px] border-customOrange px-6 py-3 rounded-lg shadow-md hover:shadow-lg"
            >
              <CirclePlus size={20} />
              <span className="ml-2 text-[16px] font-[300]">Add New Employee</span>
            </Link>
            
              
            )}
          <FilterComponent />

          </div>

        </div>
      

      {loading && <p className="text-white">Loading employees...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-7 gap-4 bg-gray-900 text-white font-semibold p-3 rounded-t-lg mt-10">
        <div>Employee</div>
        <div>Employee ID</div>
        <div>Department</div>
        <div>Designation</div>
        <div>Type</div>
        <div>Status</div>
        {isAdmin ? <div className="text-center">Action</div> : <div>City</div>}
      </div>

      <AllEmployee employees={filteredEmployees} isAdmin={isAdmin} />
    </div>
    </div>
  );
}
