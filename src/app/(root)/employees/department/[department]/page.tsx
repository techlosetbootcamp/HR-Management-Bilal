"use client";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  Trash,
  Eye,
  PencilLine,
  CirclePlus,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import SearchBar from "@/components/searchbar/Searchbar";
import useEmployees from "./useDepartment";
import LottieAnimation from "@/components/lottieAnimation/LottieAnimation";

export default function DepartmentEmployees() {
  const params = useParams();
  const departmentName = params
    ? decodeURIComponent(params.department as string)
    : "";

  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const {
    employees,
    loading,
    error,
    searchTerm,
    selectedCity,
    isFilterOpen,
    uniqueCities,
    setIsFilterOpen,
    handleSearchChange,
    handleCityChange,
    handleDeleteEmployee,
    handleViewEmployee,
    handleEditEmployee,
  } = useEmployees(departmentName);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#131313]">
        <LottieAnimation /> 
      </div>
    );
  }

  return (
    <div className="dark:bg-[#131313] dark:text-white rounded-b-lg p-4 border dark:border-gray-700 rounded-[15px]">
      <div className="flex justify-between items-center mt-3">
        <SearchBar value={searchTerm} onChange={handleSearchChange} />

        <div className="flex gap-4">
          {isAdmin && (
            <Link
              href="/employees/addEmployee"
              className="mt-3 flex items-center bg-customOrange text-white hover:text-customOrange dark:hover:bg-[#131313] hover:bg-white font-medium transition-all duration-300 ease-in-out border-[1px] border-customOrange px-6 py-3 rounded-lg shadow-md hover:shadow-lg"
            >
              <CirclePlus size={20} />
              <span className="ml-2 text-[16px] font-[300]">
                Add New Employee
              </span>
            </Link>
          )}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="border-[1px] border-gray-300 dark:border-gray-600 bg-white dark:bg-[#131313] text-gray-900 dark:text-white flex items-center rounded-lg px-6 py-3 mr-3 mt-3"
          >
            <div className="hover:text-customOrange flex transition-all duration-300 ease-in-out">
              <SlidersHorizontal size={24} />
              <span className="ml-3 text-[16px] font-[300]">Filter</span>
            </div>
          </button>
        </div>
      </div>

      {isFilterOpen && (
        <div className="absolute z-50 mt-2 w-48 bg-gray-800 text-white p-4 rounded-md shadow-md right-0">
          <label className="block text-sm font-medium mb-2">
            Filter by City:
          </label>
          <select
            value={selectedCity}
            onChange={handleCityChange}
            className="w-full p-2 bg-gray-700 text-white rounded-md"
          >
            <option value="">All Cities</option>
            {uniqueCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsFilterOpen(false)}
            className="w-full mt-3 bg-customOrange text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
          >
            Apply Filter
          </button>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {employees.length === 0 ? (
        <p>No employees found in this department.</p>
      ) : (
        <div className="w-full">
          <div className="flex mt-10 px-4 py-2 rounded-md font-bold">
            <div className="w-1/4">Employee Name</div>
            <div className="w-1/6">Employee ID</div>
            <div className="w-1/6">Designation</div>
            <div className="w-1/6">Type</div>
            <div className="w-1/6">Status</div>
            <div className="w-1/6">{isAdmin ? "Action" : "City"}</div>
          </div>
          <hr className="border-gray-700" />
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="flex items-center border-b border-gray-700 px-4 py-3"
            >
              <div className="w-1/4 flex items-center gap-2">
                <Image
                  width={30}
                  height={30}
                  src={emp.photoURL || "/default-avatar.png"}
                  alt={emp.firstName}
                  className="w-8 h-8 rounded-full"
                />
                {emp.firstName} {emp.lastName}
              </div>
              <div className="w-1/6">{emp.employeeId}</div>

              <div className="w-1/6">{emp.designation}</div>
              <div className="w-1/6">{emp.employmentType}</div>
              <div className="w-1/6">
                <span
                  className={` text-xs ${
                    emp.status === "Permanent"
                      ? "text-customOrange"
                      : "bg-blue-600"
                  }`}
                >
                  {emp.status}
                </span>
              </div>

              <div className="w-1/6">
                {isAdmin ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewEmployee(emp.id)}
                      className="dark:text-white p-2 rounded hover:text-blue-500"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => handleEditEmployee(emp.id)}
                      className="dark:text-white p-2 rounded hover:text-green-600"
                    >
                      <PencilLine size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteEmployee(emp.id)}
                      className="dark:text-white p-2 rounded hover:text-customOrange font-extrabold"
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                ) : (
                  <span>{emp.city || "N/A"}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
