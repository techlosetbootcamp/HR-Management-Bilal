"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchEmployees, updateEmployee, deleteEmployee } from "@/redux/slice/employeeSlice";
import { Eye, Edit, Trash, X } from "lucide-react"; // Icons

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  department: string;
  designation: string;
  employmentType: string;
  email: string;
  photoURL?: string;
}

export default function EmployeesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { employees, loading, error } = useSelector((state: RootState) => state.employees);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleUpdate = () => {
    if (editEmployee) {
      dispatch(updateEmployee({ id: editEmployee.id, updatedData: editEmployee }));
    }
    setEditEmployee(null);
  };

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
              {/* ✅ Employee Name with Profile Picture */}
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
              {/* ✅ Action Buttons */}
              <td className="border p-3 flex gap-2">
                <button onClick={() => setSelectedEmployee(emp)} className="text-white bg-gray-700 p-2 rounded">
                  <Eye size={16} />
                </button>
                <button onClick={() => setEditEmployee(emp)} className="text-white bg-blue-500 p-2 rounded">
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(emp.id)} className="text-white bg-red-500 p-2 rounded">
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ View Employee Details Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Employee Details</h3>
              <button onClick={() => setSelectedEmployee(null)} className="text-white">
                <X size={18} />
              </button>
            </div>
            <img src={selectedEmployee.photoURL || "/default-avatar.png"} alt="Profile" className="w-16 h-16 rounded-full mx-auto mb-4" />
            <p className="text-white"><strong>Name:</strong> {selectedEmployee.firstName} {selectedEmployee.lastName}</p>
            <p className="text-white"><strong>Email:</strong> {selectedEmployee.email}</p>
            <p className="text-white"><strong>Department:</strong> {selectedEmployee.department}</p>
            <p className="text-white"><strong>Designation:</strong> {selectedEmployee.designation}</p>
            <p className="text-white"><strong>Employment Type:</strong> {selectedEmployee.employmentType}</p>
          </div>
        </div>
      )}

      {/* ✅ Edit Employee Modal */}
      {editEmployee && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Edit Employee</h3>
              <button onClick={() => setEditEmployee(null)} className="text-white">
                <X size={18} />
              </button>
            </div>
            <input
              type="text"
              value={editEmployee.firstName}
              onChange={(e) => setEditEmployee({ ...editEmployee, firstName: e.target.value })}
              className="border p-2 w-full mb-2 bg-gray-800 text-white"
              placeholder="First Name"
            />
            <input
              type="text"
              value={editEmployee.lastName}
              onChange={(e) => setEditEmployee({ ...editEmployee, lastName: e.target.value })}
              className="border p-2 w-full mb-2 bg-gray-800 text-white"
              placeholder="Last Name"
            />
            <input
              type="text"
              value={editEmployee.designation}
              onChange={(e) => setEditEmployee({ ...editEmployee, designation: e.target.value })}
              className="border p-2 w-full mb-2 bg-gray-800 text-white"
              placeholder="Designation"
            />
            <input
              type="text"
              value={editEmployee.department}
              onChange={(e) => setEditEmployee({ ...editEmployee, department: e.target.value })}
              className="border p-2 w-full mb-2 bg-gray-800 text-white"
              placeholder="Department"
            />
            <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded w-full">
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
