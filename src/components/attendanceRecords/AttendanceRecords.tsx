import { AttendanceRecordsProps } from "@/types/attandance";
import React from "react";

const AttendanceRecords: React.FC<AttendanceRecordsProps> = ({
  attendanceRecords,
  formatDate,
  formatTime,
}) => {
  return (
    <div className="dark:bg-customBlack dark:text-white p-6 rounded-lg">
      <div className="hidden md:grid grid-cols-6 gap-4 font-extrabold text-sm dark:border-b border-gray-700 pb-3 text-[#A2A1A8]">
        <span>Date</span>
        <span>Check In</span>
        <span>Check Out</span>
        <span>Break</span>
        <span>Working Hours</span>
        <span>Status</span>
      </div>

      {attendanceRecords?.map((record) => (
        <div
          key={record?.id}
          className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center text-sm py-3 border-b dark:border-gray-800"
        >
          <div className="flex justify-between md:block">
            <span className="md:hidden text-gray-400">Date: </span>
            {formatDate(record?.date)}
          </div>
          <div className="flex justify-between md:block">
            <span className="md:hidden text-gray-400">Check In: </span>
            {formatTime(record?.checkIn)}
          </div>
          <div className="flex justify-between md:block">
            <span className="md:hidden text-gray-400">Check Out: </span>
            {formatTime(record?.checkOut)}
          </div>
          <div className="flex justify-between md:block">
            <span className="md:hidden text-gray-400">Break: </span>
            {record?.breakTime}
          </div>
          <div className="flex justify-between md:block">
            <span className="md:hidden text-gray-400">Working Hours: </span>
            {record?.workingHours}
          </div>
          <div className="flex justify-between md:block">
            <span className="md:hidden text-gray-400">Status: </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                record?.status === "ON_TIME"
                  ? "bg-green-900 text-green-400"
                  : "bg-red-900 text-red-400"
              }`}
            >
              {record?.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceRecords;
