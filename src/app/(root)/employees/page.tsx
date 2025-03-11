'use client';
import FilterDepatment from "@/components/filterdepartment/FilterDepartment";
import LottieAnimation from "@/components/lottieAnimation/LottieAnimation";
import EmployeeHeader from "@/components/employeeHeader/EmployeeHeader";
import AllEmployee from "@/components/allEmployee/AllEmployee";
import { useEmployee } from "./useEmployee";

export default function EmployeePage() {
  const {
    loading,
    error,
    filteredEmployees,
    isAdmin,
    searchTerm,
    showFilter,
    setShowFilter,
    handleSearchChange
  } = useEmployee();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#131313]">
        <LottieAnimation />
      </div>
    );
  }

  return (
    <div className="dark:bg-[#131313]">
      <div className="border-[1px] border-gray-700 rounded-[15px] p-4">
        <EmployeeHeader 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          isAdmin={isAdmin}
        />

        {error && <p className="text-red-500">{error}</p>}

        {showFilter ? (
          <FilterDepatment employees={filteredEmployees} />
        ) : (
          <>
            <AllEmployee isAdmin={isAdmin} employees={filteredEmployees} />
          </>
        )}
      </div>
    </div>
  );
}
