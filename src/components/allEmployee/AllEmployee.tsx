"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // Import useRouter
import { AppDispatch, RootState } from "@/redux/store";
import { fetchEmployees, deleteEmployee } from "@/redux/slice/employeeSlice";
import { Edit, Trash, Eye } from "lucide-react";

export default function EmployeesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter(); // Initialize useRouter
  const { employees, loading, error } = useSelector((state: RootState) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      dispatch(deleteEmployee(id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Employee List</h2>
      {loading && <p className="text-white">Loading employees...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full border border-gray-700 text-white">
        <thead>
          <tr className="bg-gray-900">
            <th className="border p-3">Employee Name</th>
            <th className="border p-3">Employee ID</th>
            <th className="border p-3">Department</th>
            <th className="border p-3">Designation</th>
            <th className="border p-3">Type</th>
            <th className="border p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="border-b border-gray-700">
              <td className="border p-3 flex items-center gap-2">
                <img src={emp.photoURL || "/default-avatar.png"} alt={emp.firstName} className="w-8 h-8 rounded-full" />
                {emp.firstName} {emp.lastName}
              </td>
              <td className="border p-3">{emp.employeeId}</td>
              <td className="border p-3">{emp.department}</td>
              <td className="border p-3">{emp.designation}</td>
              <td className="border p-3">
                <span className={`px-3 py-1 rounded-md text-xs ${emp.employmentType === "Permanent" ? "bg-orange-600" : "bg-blue-600"}`}>
                  {emp.employmentType}
                </span>
              </td>
              <td className="border p-3 flex gap-2">
                {/* View Button */}
                <button
                  onClick={() => router.push(`/employees/${emp.id}`)}
                  className="text-white bg-gray-700 p-2 rounded"
                >
                  <Eye size={16} />
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => router.push(`/employees/${emp.id}?edit=true`)}
                  className="text-white bg-blue-500 p-2 rounded"
                >
                  <Edit size={16} />
                </button>

                {/* Delete Button */}
                <button onClick={() => handleDelete(emp.id)} className="text-white bg-red-500 p-2 rounded">
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
