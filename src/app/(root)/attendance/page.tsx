"use client";

import { useState, useEffect } from "react";

export default function AttendanceForm() {
  interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    photoURL: string;
    designation: string;
    employmentType: string;
    city: string;
    officeLocation: string;
  }

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [date, setDate] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [breakTime, setBreakTime] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [manualWorkingHours, setManualWorkingHours] = useState("");

  useEffect(() => {
    async function fetchEmployees() {
      const res = await fetch("/api/employee");
      const data = await res.json();
      setEmployees(data);
    }
    fetchEmployees();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee || !status || !date) {
      alert("Employee, date, and status are required!");
      return;
    }

    const payload = {
      employeeId: selectedEmployee.id,
      date: new Date(date).toISOString(),
      checkIn: checkIn ? new Date(`${date}T${checkIn}:00`).toISOString() : null,
      checkOut: checkOut ? new Date(`${date}T${checkOut}:00`).toISOString() : null,
      breakTime: breakTime || null,
      workingHours: manualWorkingHours || "0:00",
      status,
    };

    try {
      setLoading(true);
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Attendance recorded successfully!");
        resetForm();
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedEmployee(null);
    setDate("");
    setCheckIn("");
    setCheckOut("");
    setBreakTime("");
    setStatus("");
    setShowModal(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Employee List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Employee Name</th>
            <th className="p-2">Designation</th>
            <th className="p-2">Type</th>
            <th className="p-2">Office Location</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="border-b">
              <td className="p-2 flex items-center">
                <img
                  src={emp.photoURL}
                  alt={emp.firstName}
                  className="w-10 h-10 rounded-full mr-2"
                />
                {emp.firstName} {emp.lastName}
              </td>
              <td className="p-2">{emp.designation}</td>
              <td className="p-2">{emp.employmentType}</td>
              <td className="p-2">{emp.officeLocation}</td>
              <td className="p-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => {
                    setSelectedEmployee(emp);
                    setShowModal(true);
                  }}
                >
                  Mark Attendance
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedEmployee && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-[100]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-[101]">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 z-[102] text-gray-600 hover:text-red-600 bg-white w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 shadow-md"
              onClick={resetForm}
            >
              ✖
            </button>

            <h2 className="text-lg font-semibold mb-4">
              Mark Attendance for {selectedEmployee.firstName} {selectedEmployee.lastName}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <label className="block">Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <label className="block">Check In:</label>
              <input
                type="time"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <label className="block">Check Out:</label>
              <input
                type="time"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <label className="block">Break Time (HH:MM):</label>
              <input
                type="text"
                value={breakTime}
                onChange={(e) => setBreakTime(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="e.g., 01:30"
              />
              <label className="block">Working Hours (HH:MM):</label>
              <input
                type="text"
                value={manualWorkingHours}
                onChange={(e) => setManualWorkingHours(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="e.g., 07:30"
              />
              <label className="block">Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Status</option>
                <option value="ON_TIME">On Time</option>
                <option value="LATE">Late</option>
                <option value="ABSENT">Absent</option>
                <option value="LEAVE">Leave</option>
              </select>
              <button
                type="submit"
                className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
