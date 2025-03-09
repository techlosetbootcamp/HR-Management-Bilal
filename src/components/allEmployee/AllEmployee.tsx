
  
"use client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { deleteEmployee } from "@/redux/slice/employeeSlice";
import { Trash, Eye, PencilLine } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage, setEmployeesPerPage] = useState(6); // Correctly set state for employeesPerPage

  // Calculate the indices for the current page
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="dark:bg-[#131313] dark:text-white rounded-b-lg">
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
                className={` text-xs ${
                  emp.status === "Permanent" ? "text-customOrange" : "bg-blue-600"
                }`}
              >
                {emp.status}
              </span>
            </div>

            {isAdmin ? (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => router.push(`/employees/${emp.id}`)}
                  className="dark:text-white p-2 rounded hover:text-blue-500"
                >
                  <Eye size={24} />
                </button>
                <button
                  onClick={() => router.push(`/employees/${emp.id}?edit=true`)}
                  className="dark:text-white p-2 rounded hover:text-green-600"
                >
                  <PencilLine size={24} />
                </button>
                <button
                  onClick={() => dispatch(deleteEmployee(emp.id))}
                  className="dark:text-white p-2 rounded hover:text-customOrange font-extrabold"
                >
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
      <div className="flex justify-between items-center mt-3">
        {/* Left: Items Per Page Dropdown */}
        <div className="flex items-center gap-2 text-white">
          <span>Showing</span>
          <select
            value={employeesPerPage}
            onChange={(e) => setEmployeesPerPage(Number(e.target.value))}
            className="bg-gray-800 text-white border border-gray-600 px-2 py-1 rounded-md"
          >
            {[6, 10, 20, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Center: Record Count */}
        <div className="text-white">
          Showing {indexOfFirstEmployee + 1} to {Math.min(indexOfLastEmployee, employees.length)} out of {employees.length} records
        </div>

        {/* Right: Pagination */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md text-white disabled:opacity-50"
          >
            {"<"}
          </button>

          {[...Array(Math.ceil(employees.length / employeesPerPage)).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={`px-3 py-1 rounded-md border ${currentPage === number + 1 ? "border-customOrange text-customOrange" : "border-gray-500 text-white"}`}
            >
              {number + 1}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(employees.length / employeesPerPage)}
            className="px-3 py-1 rounded-md text-white disabled:opacity-50"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
