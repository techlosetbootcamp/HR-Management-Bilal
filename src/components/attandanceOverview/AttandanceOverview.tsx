"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Pagination from "@/components/pagination/Pagination";
import { useAttendanceOverview } from "./useAttandanceOverview";
import LottieAnimation from "../lottieAnimation/LottieAnimation";
import { AttendanceOverviewProps } from "@/types/attandance";

const AttendanceOverview: React.FC<AttendanceOverviewProps> = ({
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
      <div className="flex justify-center items-center h-screen dark:bg-customBlack">
        <LottieAnimation />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // Conditionally slice records: if showPagination is false, only show 6 records
  const recordsToDisplay = showPagination
    ? attendanceRecords
    : attendanceRecords?.slice(0, 6);

  return (
    <div className="dark:bg-customBlack rounded-lg shadow-lg dark:text-white p-6">
      <div className="flex justify-between items-end mb-4">
        <h1 className="text-lg">Attendance Overview</h1>
        {showViewAll && (
          <button
            className="px-4 py-2 text-sm text-customOrange underline rounded-lg"
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
          {recordsToDisplay && recordsToDisplay.length > 0 ? (
            recordsToDisplay.map((record) => (
              <tr key={record?.id} className="border-b dark:border-gray-800">
                <td className="py-2 flex items-center gap-2">
                  <Image
                    src={record?.employee?.photoURL || "/default-profile.png"}
                    alt={`${record?.employee?.firstName || "User"}'s profile`}
                    width={40}
                    height={40}
                    className="rounded-full object-cover w-[40px] h-[40px]"
                  />
                  <span>
                    {record?.employee?.firstName ?? "N/A"}{" "}
                    {record?.employee?.lastName ?? ""}
                  </span>
                </td>
                <td className="py-2">
                  {record?.employee?.designation ?? "N/A"}
                </td>
                <td className="py-2">
                  {record?.employee?.employmentType ?? "N/A"}
                </td>
                <td className="py-2">{formatDate(record?.checkIn) ?? "N/A"}</td>
                <td className="py-2">
                  {formatDate(record?.checkOut) ?? "N/A"}
                </td>
                <td className="py-2">
                  <span
                    className={`px-2 py-1 rounded-lg text-xs ${
                      record?.status === "ON_TIME"
                        ? "bg-green-700 text-green-300"
                        : "bg-red-700 text-red-300"
                    }`}
                  >
                    {record?.status ?? "Unknown"}
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
          totalItems={totalItems ?? 0}
          itemsPerPage={itemsPerPage ?? 10}
          currentPage={currentPage ?? 1}
          onPageChange={(page) => setCurrentPage?.(page)}
          onItemsPerPageChange={(num) => {
            setItemsPerPage?.(num);
            setCurrentPage?.(1);
          }}
        />
      )}
    </div>
  );
};

export default AttendanceOverview;
