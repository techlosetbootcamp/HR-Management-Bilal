"use client";

import AttendanceTable from "@/components/attendance/Attandance";
import { useState, useEffect } from "react";

export default function AttendanceForm() {
  interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    photoURL: string;
    designation: string;
    employmentType: string;
  }

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [date, setDate] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [breakTime, setBreakTime] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

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
      checkIn: checkIn ? `${date}T${checkIn}:00` : null, // Combine with selected date
      checkOut: checkOut ? `${date}T${checkOut}:00` : null,
      breakTime: breakTime || null,
      workingHours: workingHours || null,
      status,
    };

    try {
      setLoading(true);
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseText = await res.text();
      const responseData = responseText ? JSON.parse(responseText) : {};

      if (res.ok) {
        alert("Attendance recorded successfully!");
        resetForm();
      } else {
        alert(responseData.error || "Something went wrong");
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
    setWorkingHours("");
    setStatus("");
    setShowPopup(false);
  };

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowPopup(true);
  };

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id} className="cursor-pointer" onClick={() => handleEmployeeClick(emp)}>
            <img src={emp.photoURL} alt={`${emp.firstName} ${emp.lastName}`} className="w-10 h-10 rounded-full" />
            <span>{emp.firstName} {emp.lastName}</span>
            <span>{emp.designation}</span>
            <span>{emp.employmentType}</span>
          </li>
        ))}
      </ul>

      {showPopup && selectedEmployee && (
        <div className="popup">
          <form onSubmit={handleSubmit}>
            <h2>Mark Attendance for {selectedEmployee.firstName} {selectedEmployee.lastName}</h2>

            <label>Date:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

            <label>Check In:</label>
            <input type="time" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />

            <label>Check Out:</label>
            <input type="time" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />

            <label>Break Time:</label>
            <input type="text" placeholder="00:30 Min" value={breakTime} onChange={(e) => setBreakTime(e.target.value)} />

            <label>Working Hours:</label>
            <input type="text" placeholder="09:02 Hrs" value={workingHours} onChange={(e) => setWorkingHours(e.target.value)} />

            <label>Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Select Status</option>
              <option value="ON_TIME">On Time</option>
              <option value="LATE">Late</option>
              <option value="ABSENT">Absent</option>
              <option value="LEAVE">Leave</option>
            </select>

            <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
          </form>
        </div>
      )}

      <AttendanceTable />
    </div>
  );
}
    

