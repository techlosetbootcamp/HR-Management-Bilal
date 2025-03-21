"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import useAttendance from "@/app/(root)/attandance/useAttendance";
import SearchBar from "@/components/searchbar/Searchbar";
import Pagination from "@/components/pagination/Pagination";
import { useSession } from "next-auth/react";

const AttendancePage: React.FC = () => {
  const router = useRouter();
  const {data :session}= useSession()
  const isAdmin= session?.user.role =="ADMIN";
  const {
    loading,
    error,
    searchTerm,
    handleItemsPerPageChange,
    handlePageChange,
    filteredAttendance,
    itemsPerPage,
    currentPage,
    formatDate,
    currentRecords,
    handleSearchChange,
  } = useAttendance();
  if (loading) {
    return (
      <div className="text-center text-white">
        Loading attendance records...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white min-h-screen">
      <div className=" md:flex-row md:justify-between md:items-center mb-4 gap-4">
        <h3 className="text-lg font-semibold">All Employees Attendance</h3>
        <div className="flex justify-between">
          <div className="w-full md:w-[300px]">
            <SearchBar value={searchTerm} onChange={handleSearchChange} />
          </div>
          {isAdmin && (
            <button
            className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-800 rounded-lg hover:bg-gray-700"
            onClick={() => router.push("./attandance/markAttandance")}
          >
            <CheckCircle size={24} /> Mark Attendance
          </button>
          )}
        </div>
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
          {currentRecords.length > 0 ? (
            currentRecords.map((record) => (
              <tr
                key={record.id}
                className="border-b border-gray-800 hover:bg-gray-800"
              >
                <td className="py-2 flex items-center gap-2">
                  <Image
                    src={record.employee.photoURL || "/default-profile.png"}
                    alt={`${record.employee.firstName}'s profile`}
                    width={32}
                    height={32}
                    className="rounded-full"
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
              <td className="py-4 text-center" colSpan={5}>
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        totalItems={filteredAttendance.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default AttendancePage;
