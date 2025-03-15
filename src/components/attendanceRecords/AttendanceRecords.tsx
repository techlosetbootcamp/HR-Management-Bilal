import { AttendanceRecordsProps } from "@/types/attandance";
import React from "react";


const AttendanceRecords: React.FC<AttendanceRecordsProps> = ({
  attendanceRecords,
  formatDate,
  formatTime,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Attendance Records</h3>

      {attendanceRecords.length > 0 ? (
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-600 p-2">Date</th>
              <th className="border border-gray-600 p-2">Check-In</th>
              <th className="border border-gray-600 p-2">Check-Out</th>
              <th className="border border-gray-600 p-2">Break Time</th>
              <th className="border border-gray-600 p-2">Working Hours</th>
              <th className="border border-gray-600 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => (
              <tr key={record.id}>
                <td className="border border-gray-600 p-2">{formatDate(record.date)}</td>
                <td className="border border-gray-600 p-2">{formatTime(record.checkIn)}</td>
                <td className="border border-gray-600 p-2">{formatTime(record.checkOut)}</td>
                <td className="border border-gray-600 p-2">{record.breakTime}</td>
                <td className="border border-gray-600 p-2">{record.workingHours}</td>
                <td
                  className={`border border-gray-600 p-2 ${
                    record.status === "Present" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {record.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No attendance records found for this employee.</p>
      )}
    </div>
  );
};

export default AttendanceRecords;