"use client";
import React from "react";
import Image from "next/image";
import { LeaveRecordProps } from "@/types/leaves";

// interface Leave {
//   id: string;
//   employee: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     photoURL?: string;
//   };
//   reason: string;
//   startDate: string;
//   endDate: string;
//   status: string;
// }

// interface LeaveRecordProps {
//   leaves: Leave[];
//   loading?: boolean;
//   isAdmin?: boolean;
//   showEmployeeDetails?: boolean;
//   updateLeaveStatus?: (
//     leaveId: string,
//     status: "APPROVED" | "REJECTED"
//   ) => Promise<void>;
// }

const LeaveRecord: React.FC<LeaveRecordProps> = ({
  leaves,
  loading,
  isAdmin = false,
  showEmployeeDetails = true,
  updateLeaveStatus,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-[#131313] rounded-lg">
        <thead className="px-4 py-2 text-left">
          <tr>
            {showEmployeeDetails && (
              <>
                <th className="p-4">Employee</th>
                <th className="p-4">Email</th>
              </>
            )}
            <th className="p-4">Reason</th>
            <th className="p-4">Start Date</th>
            <th className="p-4">End Date</th>
            <th className="px-6 py-2">Status</th>
            {isAdmin && <th className="px-4 py-2 text-center">Actions</th>}
          </tr>
        </thead>
        <tbody className="px-4 py-3">
          {leaves.map((leave) => (
            <tr
              key={leave.id}
              className="border-b border-gray-300 dark:border-gray-700"
            >
              {showEmployeeDetails && (
                <>
                  <td className="p-4 flex items-center gap-2">
                    {leave.employee.photoURL && (
                      <Image
                        src={leave.employee.photoURL}
                        alt={`${leave.employee.firstName}'s profile`}
                        width={40}
                        height={40}
                        className="rounded-full object-cover w-[40] h-[40]"
                      />
                    )}
                    <span>
                      {leave.employee.firstName} {leave.employee.lastName}
                    </span>
                  </td>
                  <td className="p-4">{leave.employee.email}</td>
                </>
              )}
              <td className="p-4">{leave.reason}</td>
              <td className="p-4">
                {new Date(leave.startDate).toLocaleDateString()}
              </td>
              <td className="p-4">
                {new Date(leave.endDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    leave.status === "PENDING"
                      ? "bg-yellow-500 text-yellow-100"
                      : leave.status === "APPROVED"
                      ? "bg-green-500 text-green-100"
                      : "bg-red-500 text-red-100"
                  }`}
                >
                  {leave.status}
                </span>
              </td>
              {isAdmin && leave.status === "PENDING" && (
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() =>
                        updateLeaveStatus &&
                        updateLeaveStatus(leave.id, "APPROVED")
                      }
                      disabled={loading}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        updateLeaveStatus &&
                        updateLeaveStatus(leave.id, "REJECTED")
                      }
                      disabled={loading}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 text-sm"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRecord;
