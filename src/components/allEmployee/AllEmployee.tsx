"use client";
import { Trash, Eye, PencilLine } from "lucide-react";
import Image from "next/image";
import Pagination from "@/components/pagination/Pagination";
import { useAllEmployee } from "./useAllEmployee";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  department: string;
  designation: string;
  employmentType: string;
  status?: string;
  city?: string;
  photoURL?: string;
}

interface Props {
  employees: Employee[];
  isAdmin: boolean;
}

export default function AllEmployee({ employees, isAdmin }: Props) {
  const {
    currentEmployees,
    currentPage,
    employeesPerPage,
    paginate,
    handleItemsPerPageChange,
    handleViewEmployee,
    handleEditEmployee,
    handleDeleteEmployee,
  } = useAllEmployee(employees);

  return (
    <div className="dark:bg-[#131313] dark:text-white rounded-b-lg">
      {/* Table header */}
      <div className="mt-5 grid grid-cols-7 gap-4 text-white font-semibold p-3 rounded-t-lg">
        <div>Employee</div>
        <div>Employee ID</div>
        <div>Department</div>
        <div>Designation</div>
        <div>Type</div>
        <div>Status</div>
        {isAdmin ? <div className="text-center">Action</div> : <div>City</div>}
      </div>

      {currentEmployees.length > 0 ? (
        currentEmployees.map((emp) => (
          <div key={emp.id} className="grid grid-cols-7 gap-4 border-b border-gray-700 p-3">
            <div className="flex items-center gap-2">
              <Image
                width={30}
                height={30}
                src={emp.photoURL || "/default-avatar.png"}
                alt={emp.firstName}
                className="w-8 h-8 rounded-full"
              />
              <span>{emp.firstName} {emp.lastName}</span>
            </div>
            <div>{emp.employeeId}</div>
            <div>{emp.department}</div>
            <div>{emp.designation}</div>
            <div>{emp.employmentType}</div>
            <div>
              <span className={`text-xs ${emp.status === "Permanent" ? "text-customOrange" : "bg-blue-600"}`}>
                {emp.status}
              </span>
            </div>

            {isAdmin ? (
              <div className="flex justify-center gap-2">
                <button onClick={() => handleViewEmployee(emp.id)} className="dark:text-white p-2 rounded hover:text-blue-500">
                  <Eye size={24} />
                </button>
                <button onClick={() => handleEditEmployee(emp.id)} className="dark:text-white p-2 rounded hover:text-green-600">
                  <PencilLine size={24} />
                </button>
                <button onClick={() => handleDeleteEmployee(emp.id)} className="dark:text-white p-2 rounded hover:text-customOrange font-extrabold">
                  <Trash size={24} />
                </button>
              </div>
            ) : (
              <div>{emp.city || "N/A"}</div>
            )}
          </div>
        ))
      ) : (
        <p className="text-white text-center p-4">No employees found.</p>
      )}

      {/* Pagination */}
      <Pagination
        totalItems={employees.length}
        itemsPerPage={employeesPerPage}
        currentPage={currentPage}
        onPageChange={paginate}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
}
