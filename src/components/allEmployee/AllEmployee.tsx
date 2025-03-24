"use client";
import React from "react";
import { Trash, Eye, PencilLine, CheckCircle } from "lucide-react";
import Image from "next/image";
import Pagination from "@/components/pagination/Pagination";
import { useAllEmployee } from "./useAllEmployee";
import { AllEmployeeProps } from "@/types/empoyee";
import { useSearch } from "../../../provider/SearchContext";

export default function AllEmployee({
  employees,
  isAdmin,
  isAttendancePage = false,
  handleMarkAttendance,
}: AllEmployeeProps) {
  const { searchTerm } = useSearch();

  const filteredEmployees = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const {
    currentEmployees,
    currentPage,
    employeesPerPage,
    handleDeleteEmployee,
    handleEditEmployee,
    handleViewEmployee,
    paginate,
    handleItemsPerPageChange,
  } = useAllEmployee(filteredEmployees);

  return (
    <div className="dark:bg-[#131313] dark:text-white rounded-b-lg">
      <div className="mt-5 grid grid-cols-7 gap-4 dark:text-white font-semibold p-3 rounded-t-lg">
        <div>Employee</div>
        <div>Employee ID</div>
        <div>Department</div>
        <div>Designation</div>
        <div>Type</div>
        <div>Status</div>
        <div className="text-center">Action</div>
      </div>

      {currentEmployees.length > 0 ? (
        currentEmployees.map((emp) => (
          <div
            key={emp.id}
            className="grid grid-cols-7 gap-4 border-b border-gray-700 p-3"
          >
            <div className="flex items-center gap-2">
              <Image
                width={30}
                height={30}
                src={emp.photoURL || "/default-avatar.png"}
                alt={emp.firstName}
                className="w-8 h-8 rounded-full"
              />
              <span>
                {emp.firstName} {emp.lastName}
              </span>
            </div>
            <div>{emp.employeeId}</div>
            <div>{emp.department}</div>
            <div>{emp.designation}</div>
            <div>{emp.employmentType}</div>
            <div>
              <span
                className={`text-xs ${
                  emp.status === "Permanent"
                    ? "text-customOrange"
                    : "text-blue-600"
                }`}
              >
                {emp.status}
              </span>
            </div>
            <div className="flex justify-center gap-2">
              {isAttendancePage ? (
                isAdmin ? (
                  <button
                    onClick={() => handleMarkAttendance?.(emp)}
                    className="dark:text-white p-2 rounded hover:text-green-500 flex items-center gap-1 dark:hover:text-customOrange transition-all duration-300"
                  >
                    <CheckCircle size={24} /> Mark
                  </button>
                ) : (
                  <div>{emp.city || "N/A"}</div>
                )
              ) : isAdmin ? (
                <>
                  <button
                    onClick={() => handleViewEmployee?.(emp.id)}
                    className="dark:text-white p-2 rounded hover:text-blue-500"
                  >
                    <Eye size={24} />
                  </button>
                  <button
                    onClick={() => handleEditEmployee?.(emp.id)}
                    className="dark:text-white p-2 rounded hover:text-green-600"
                  >
                    <PencilLine size={24} />
                  </button>
                  <button
                    onClick={() => handleDeleteEmployee?.(emp.id)}
                    className="dark:text-white p-2 rounded hover:text-customOrange font-extrabold"
                  >
                    <Trash size={24} />
                  </button>
                </>
              ) : (
                <div>{emp.city || "N/A"}</div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-white text-center p-4">No employees found.</p>
      )}

      <Pagination
        totalItems={filteredEmployees.length}
        itemsPerPage={employeesPerPage}
        currentPage={currentPage}
        onPageChange={paginate}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
}
