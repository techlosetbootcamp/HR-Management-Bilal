"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Pagination from "@/components/pagination/Pagination";
import { useAttendanceOverview } from "./useAttandanceOverview";
import LottieAnimation from "../lottieAnimation/LottieAnimation";

interface AttendanceOverviewProps {
  showViewAll?: boolean;
  showPagination?: boolean;
  searchTerm?: string;
}

const AttandanceOverview: React.FC<AttendanceOverviewProps> = ({
  showViewAll = true,
  showPagination = false,
  searchTerm = "",
}) => {
  const router = useRouter();
  const {
    attendanceRecords,
    totalItems,
    loading,
    error,
    formatDate,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
  } = useAttendanceOverview(searchTerm, showPagination);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-[#131313]">
        <LottieAnimation />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="dark:bg-[#131313] rounded-lg shadow-lg dark:text-white p-6">
      <div className="flex justify-end items-end mb-4">
        {showViewAll && (
          <button
            className="px-4 py-2 text-sm bg-gray-800 rounded-lg"
            onClick={() => router.push("/attandance")}
          >
            View All
          </button>
        )}
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b dark:border-gray-700 text-left">
            <th className="py-2">Employee Name</th>
            <th className="py-2">Designation</th>
            <th className="py-2">Type</th>
            <th className="py-2">Check In Time</th>
            <th className="py-2">Check Out Time</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.length > 0 ? (
            attendanceRecords.map((record) => (
              <tr
                key={record.id}
                className="border-b dark:border-gray-800"
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
                      record.status === "ON_TIME"
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
