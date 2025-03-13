"use client";

import { useEffect, useState } from "react";

interface Attendance {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  breakTime: string;
  workingHours: string;
  status: "ON_TIME" | "LATE" | "ABSENT" | "LEAVE";
}

const statusStyles = {
  ON_TIME: "bg-green-600",
  LATE: "bg-red-600",
  ABSENT: "bg-yellow-600",
  LEAVE: "bg-blue-600",
};

export default function AttendanceTable() {
  const [attendances, setAttendances] = useState<Attendance[]>([]);

  useEffect(() => {
    async function fetchAttendance() {
      try {
        const res = await fetch("/api/attendance");
        const data = await res.json();
        setAttendances(data);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    }

    fetchAttendance();
  }, []);

  // Helper function to format date and time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return "—";
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-6">Employee Attendance</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Check In</th>
              <th className="p-4 text-left">Check Out</th>
              <th className="p-4 text-left">Break</th>
              <th className="p-4 text-left">Working Hours</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {attendances.length > 0 ? (
              attendances.map((attendance) => (
                <tr key={attendance.id} className="border-t border-gray-700">
                  <td className="p-4 text-white">{formatDate(attendance.date)}</td>
                  <td className="p-4 text-white">{formatTime(attendance.checkIn)}</td>
                  <td className="p-4 text-white">{formatTime(attendance.checkOut)}</td>
                  <td className="p-4 text-white">{attendance.breakTime || "—"}</td>
                  <td className="p-4 text-white">{attendance.workingHours || "—"}</td>
                  <td className="p-4">
                    <span
                      className={`text-white py-1 px-3 rounded-lg text-sm ${statusStyles[attendance.status]}`}
                    >
                      {attendance.status.replace("_", " ")}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-400">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
