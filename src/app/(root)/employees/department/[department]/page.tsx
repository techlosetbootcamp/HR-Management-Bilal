"use client";
import { useParams } from "next/navigation";
import useEmployees from "./useDepartment";
import LottieAnimation from "@/components/lottieAnimation/LottieAnimation";
import EmployeeHeader from "@/components/employeeHeader/EmployeeHeader";
import AllEmployee from "@/components/allEmployee/AllEmployee";

export default function DepartmentEmployees() {
  const params = useParams();
  const departmentName = params
    ? decodeURIComponent(params.department as string)
    : "";

 
  const {
    employees,
    loading,
    searchTerm,
    selectedCity,
    isFilterOpen,
    uniqueCities,
    setIsFilterOpen,
    handleSearchChange,
    handleCityChange,
    isAdmin,
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
      <h1 className="text-2xl font-bold mb-4">{departmentName} Department</h1>
      
      <EmployeeHeader 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        showFilter={isFilterOpen}
        setShowFilter={setIsFilterOpen}
        isAdmin={isAdmin}
      />

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


      <AllEmployee employees={employees} isAdmin={isAdmin} isAttendancePage={false}/>
    </div>
  );
}
