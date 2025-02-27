"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchEmployees, deleteEmployee } from "@/redux/slice/employeeSlice";
import { Edit, Trash, Eye } from "lucide-react";
import { useSession } from "next-auth/react";

export default function EmployeesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { employees, loading, error } = useSelector(
    (state: RootState) => state.employees
  );
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN"; // ✅ Only admin can edit/delete

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      dispatch(deleteEmployee(id));
    }
  };

  return (
    <div className="p-6 dark:bg-[#131313]">
      <h2 className="text-2xl font-bold mb-4 text-white ">Employee List</h2>
      {loading && <p className="text-white">Loading employees...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Table-like Grid Container */}
      <div className="grid grid-cols-6 dark:bg-gray-900 dark:text-white font-semibold p-3 rounded-t-lg">
        <div className="p-2">Employee Name</div>
        <div className="p-2">Employee ID</div>
        <div className="p-2">Department</div>
        <div className="p-2">Designation</div>
        <div className="p-2">Type</div>
        {isAdmin && <div className="p-2 text-center">Action</div>}
      </div>

      {/* Employee Rows */}
      <div className="dark:bg-gray-800 dark:text-white rounded-b-lg">
        {employees.map((emp, index) => (
          <div
            key={emp.id}
            className={`grid grid-cols-6 p-3 border-b border-gray-700 ${
              index % 2 === 0 ? "dark:bg-gray-700" : "dark:bg-gray-800"
            }`}
          >
            {/* Employee Name & Image */}
            <div className="p-2 flex items-center gap-2">
              <img
                src={emp.photoURL || "/default-avatar.png"}
                alt={emp.firstName}
                className="w-8 h-8 rounded-full"
              />
              <span>
                {emp.firstName} {emp.lastName}
              </span>
            </div>

            {/* Employee Details */}
            <div className="p-2">{emp.employeeId}</div>
            <div className="p-2">{emp.department}</div>
            <div className="p-2">{emp.designation}</div>
            <div className="p-2">
              <span
                className={`px-3 py-1 rounded-md text-xs ${
                  emp.employmentType === "Permanent"
                    ? "bg-orange-600"
                    : "bg-blue-600"
                }`}
              >
                {emp.employmentType}
              </span>
            </div>

            {/* Action Buttons (Only Admins) */}
            {isAdmin && (
              <div className="p-2 flex justify-center gap-2">
                {/* View Button (Everyone can see) */}
                <button
                  onClick={() => router.push(`/employees/${emp.id}`)}
                  className="text-white bg-gray-700 p-2 rounded"
                >
                  <Eye size={16} />
                </button>

                {/* Edit & Delete (Admins only) */}
                <button
                  onClick={() => router.push(`/employees/${emp.id}?edit=true`)}
                  className="text-white bg-blue-500 p-2 rounded"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(emp.id)}
                  className="text-white bg-red-500 p-2 rounded"
                >
                  <Trash size={16} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
