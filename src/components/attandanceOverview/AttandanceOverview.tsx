"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAttendanceRecords } from "./useAttandanceOverview";
import { Loader } from "lucide-react";
import Pagination from "@/components/pagination/Pagination";

interface AttendanceOverviewProps {
  showViewAll?: boolean;
  showPagination?: boolean;
}

const AttandanceOverview: React.FC<AttendanceOverviewProps> = ({
  showViewAll = true,
  showPagination = false,
}) => {
  const router = useRouter();
  const { loading, attendanceRecords, error, formatDate } = useAttendanceRecords();

  // Pagination state only if pagination should be shown.
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Determine records to show.
  // If pagination is enabled, slice based on current page; otherwise, show all.
  const totalItems = attendanceRecords.length;
  const recordsToShow = showPagination
    ? attendanceRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : attendanceRecords;

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white">
      <div className="flex justify-end items-end mb-4">
        {showViewAll && (
          <button
            className="px-4 py-2 text-sm bg-gray-800 rounded-lg hover:bg-gray-700"
            onClick={() => router.push("/attandance")}
          >
            View All
          </button>
        )}
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-700 text-left">
            <th className="py-2">Employee Name</th>
            <th className="py-2">Designation</th>
            <th className="py-2">Type</th>
            <th className="py-2">Check In Time</th>
            <th className="py-2">Check Out Time</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {recordsToShow.length > 0 ? (
            recordsToShow.map((record) => (
              <tr
                key={record.id}
                className="border-b border-gray-800 hover:bg-gray-800"
              >
                <td className="py-2 flex items-center gap-2">
                  <Image
                    src={record.employee.photoURL || "/default-profile.png"}
                    alt={`${record.employee.firstName}'s profile`}
                    width={40}
                    height={40}
                    className="rounded-full object-cover w-[40px] h-[40px]"
                  />
                  <span>
                    {record.employee.firstName} {record.employee.lastName}
                  </span>
                </td>
                <td className="py-2">{record.employee.designation}</td>
                <td className="py-2">{record.employee.employmentType}</td>
                <td className="py-2">{formatDate(record.checkIn)}</td>
                <td className="py-2">{formatDate(record.checkOut)}</td>
                <td className="py-2">
                  <span
                    className={`px-2 py-1 rounded-lg text-xs ${
                      record.status === "On Time"
                        ? "bg-green-700 text-green-300"
                        : "bg-red-700 text-red-300"
                    }`}
                  >
                    {record.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-4 text-center" colSpan={6}>
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showPagination && (
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          onItemsPerPageChange={(num) => {
            setItemsPerPage(num);
            setCurrentPage(1);
          }}
        />
      )}
    </div>
  );
};

export default AttandanceOverview;
