"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash, Eye, PencilLine, CirclePlus } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { deleteEmployee } from "@/redux/slice/employeeSlice";
import { useSession } from "next-auth/react";
// import FilterComponent from "@/components/filter/Filter";
import Link from "next/link";
import SearchBar from "@/components/searchbar/Searchbar";

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

export default function DepartmentEmployees() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const departmentName = params
    ? decodeURIComponent(params.department as string)
    : "";

  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!departmentName) return;

    const fetchEmployees = async () => {
      try {
        console.log("Fetching employees for department:", departmentName);
        const response = await fetch(
          `/api/employees?department=${departmentName}`
        );
        if (!response.ok) throw new Error("Failed to fetch employees");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, [departmentName]);

  const filteredEmployees = employees.filter(
    (emp) =>
      `${emp.firstName} ${emp.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dark:bg-[#131313] dark:text-white rounded-b-lg p-4">
      {/* Search and Filter Section */}
      <div className="flex justify-between items-center mt-3">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex">
          {isAdmin && (
            <Link
              href="/employees/addEmployee"
              className="mt-3 flex items-center mr-10 bg-customOrange text-white hover:text-customOrange dark:hover:bg-[#131313] hover:bg-white font-medium transition-all duration-300 ease-in-out border-[1px] border-customOrange px-6 py-3 rounded-lg shadow-md hover:shadow-lg"
            >
              <CirclePlus size={20} />
              <span className="ml-2 text-[16px] font-[300]">
                Add New Employee
              </span>
            </Link>
          )}
          {/* <FilterComponent /> */}
        </div>
      </div>

      <h2 className="text-lg font-bold mb-4">{departmentName} Department</h2>

      {filteredEmployees.length === 0 ? (
        <p>No employees found in this department.</p>
      ) : (
        <div className="w-full">
          <div className="flex bg-gray-700 dark:bg-gray-800 px-4 py-2 rounded-md font-bold">
            <div className="w-1/6">Employee ID</div>
            <div className="w-1/4">Employee Name</div>
            <div className="w-1/6">Designation</div>
            <div className="w-1/6">Type</div>
            <div className="w-1/6">Status</div>
            <div className="w-1/6">{isAdmin ? "Action" : "City"}</div>
          </div>

          {filteredEmployees.map((emp) => (
            <div
              key={emp.id}
              className="flex items-center border-b border-gray-700 px-4 py-3"
            >
              <div className="w-1/6">{emp.employeeId}</div>

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

              <div className="w-1/6">{emp.designation}</div>

              <div className="w-1/6">{emp.employmentType}</div>
                <div className="w-1/6">{emp.status || "N/A"}</div>

              <div className="w-1/6">
                {isAdmin ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/employees/${emp.id}`)}
                      className="dark:text-white p-2 rounded hover:text-blue-500"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() =>
                        router.push(`/employees/${emp.id}?edit=true`)
                      }
                      className="dark:text-white p-2 rounded hover:text-green-600"
                    >
                      <PencilLine size={20} />
                    </button>
                    <button
                      onClick={() => dispatch(deleteEmployee(emp.id))}
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
