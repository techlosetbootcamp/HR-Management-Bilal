"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchEmployees } from "@/redux/slice/employeeSlice";
import { Plus } from "lucide-react";
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

  // Apply Filters & Search
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
    <div className="p-6 dark:bg-[#131313]">
      <div className="ms-[10px] mt-[20px] me-[30px] border-[1px] border-borderGrey rounded-[10px] p-5">
        <div className="flex justify-between items-center">
          {/* ✅ Search Bar Component */}
          <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

          <div className="flex">
            {/* ✅ Add Employee Button (Admins Only) */}
            {isAdmin && (
              <Link
                href="/employees/addEmployee"
                className="flex bg-customOrange ease-in-out hover:text-customOrange duration-300 hover:bg-[#131313] border-customOrange border-[1px] hover:border-customOrange py-[11px] px-5 rounded-[10px]"
              >
                <Plus />
                <span className="ms-[10px] text-[16px]">Add New Employee</span>
              </Link>
            )}

            <FilterComponent />
          </div>
        </div>
      </div>

      {loading && <p className="text-white">Loading employees...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-7 gap-4 bg-gray-900 text-white font-semibold p-3 rounded-t-lg">
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
  );
}
