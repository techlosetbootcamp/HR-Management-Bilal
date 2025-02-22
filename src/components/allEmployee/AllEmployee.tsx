"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchEmployees, updateEmployee, deleteEmployee } from "@/redux/slice/employeeSlice";

interface Employee {
  id: string;
  firstName: string;
  employeeId: string;
  department: string;
  designation: string;
  employmentType: string;
  email: string;
}

export default function EmployeesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { employees, loading, error } = useSelector((state: RootState) => state.employees);
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
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>
      {loading && <p>Loading employees...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Employee ID</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Designation</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td className="border p-2">{emp.firstName}</td>
              <td className="border p-2">{emp.employeeId}</td>
              <td className="border p-2">{emp.department}</td>
              <td className="border p-2">{emp.designation}</td>
              <td className="border p-2">{emp.employmentType}</td>
              <td className="border p-2">{emp.email}</td>
              <td className="border p-2">
                <button onClick={() => setEditEmployee(emp)} className="bg-blue-500 text-black px-2 py-1 mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(emp.id)} className="bg-red-500 text-white px-2 py-1">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editEmployee && (
        <div className="mt-4 p-4 border">
          <h3 className="text-lg font-bold mb-2">Edit Employee</h3>
          <input
            type="text"
            value={editEmployee.firstName}
            onChange={(e) => setEditEmployee({ ...editEmployee, firstName: e.target.value })}
            className="border p-2 w-full mb-2"
          />
          <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2">
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

