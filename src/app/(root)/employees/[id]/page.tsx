"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function EmployeeDetailPage() {
  const { id } = useParams();
  const { employees } = useSelector((state: RootState) => state.employees);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const foundEmployee = employees.find((emp) => emp.id === id);
    setEmployee(foundEmployee);
  }, [id, employees]);

  if (!employee) return <p className="text-white">Employee not found.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Employee Details</h2>
      <div className="bg-gray-900 p-6 rounded-lg">
        <img src={employee.photoURL || "/default-avatar.png"} alt={employee.firstName} className="w-16 h-16 rounded-full mx-auto mb-4" />
        <p className="text-white"><strong>Name:</strong> {employee.firstName} {employee.lastName}</p>
        <p className="text-white"><strong>Email:</strong> {employee.email}</p>
        <p className="text-white"><strong>Department:</strong> {employee.department}</p>
        <p className="text-white"><strong>Designation:</strong> {employee.designation}</p>
        <p className="text-white"><strong>Employment Type:</strong> {employee.employmentType}</p>
      </div>
    </div>
  );
}
