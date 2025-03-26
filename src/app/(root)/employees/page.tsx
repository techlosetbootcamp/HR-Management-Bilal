"use client";
import FilterDepatment from "@/components/filterdepartment/FilterDepartment";
import LottieAnimation from "@/components/lottieAnimation/LottieAnimation";
import EmployeeHeader from "@/components/employeeHeader/EmployeeHeader";
import AllEmployee from "@/components/allEmployee/AllEmployee";
import { useEmployee } from "./useEmployee";

export default function Page() {
  const {
    loading,
    error,
    filteredEmployees,
    isAdmin,
    searchTerm,
    showFilter,
    setShowFilter,
    handleSearchChange,
  } = useEmployee();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-customBlack">
        <LottieAnimation />
      </div>
    );
  }

  return (
    <div className="dark:bg-customBlack">
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
            <AllEmployee
              isAdmin={isAdmin}
              employees={filteredEmployees}
              isAttendancePage={false}
            />
          </>
        )}
      </div>
    </div>
  );
}
