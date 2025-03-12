"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useFilterDepartment } from "@/components/filterdepartment/useFilterDepartment";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  designation: string;
  department: string;
  photoURL?: string;
}

interface Props {
  employees: Employee[];
}

export default function FilterDepatment({ employees }: Props) {
  const { handleEmployeeClick } = useFilterDepartment();
  const router = useRouter();

  

  const employeesByDepartment = employees.reduce((acc, emp) => {
    if (!acc[emp.department]) {
      acc[emp.department] = [];
    }
    acc[emp.department].push(emp);
    return acc;
  }, {} as Record<string, Employee[]>);

  return (
    <div className="dark:bg-[#131313] dark:text-white mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(employeesByDepartment).map(([department, empList]) => (
          <div
            key={department}
            className="bg-[#1E1E1E] p-5 rounded-lg shadow-md border border-gray-700"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">{department} Department</h2>
              <button
                onClick={() =>
                  router.push(
                    `/employees/department/${encodeURIComponent(department)}`
                  )
                }
                className="text-customOrange text-sm font-medium hover:underline"
              >
                View All
              </button>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              {empList.length} Members
            </p>
            <hr className="border-gray-700" />
            <div className="space-y-2">
              {empList.slice(0, 5).map((emp) => (
                <div
                  key={emp.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800 cursor-pointer transition"
                  onClick={() => handleEmployeeClick(emp.id)}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      width={40}
                      height={40}
                      src={emp.photoURL || "/default-avatar.png"}
                      alt={emp.firstName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">
                        {emp.firstName} {emp.lastName}
                      </p>
                      <p className="text-xs text-gray-400">{emp.designation}</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="dark:text-white" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
