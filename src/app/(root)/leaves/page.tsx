"use client";
import Image from "next/image";
import React from "react";
import { useLeave } from "@/hooks/useLeave";
import { useSession } from "next-auth/react";

export default function AdminLeavePanel() {
  const { data: session } = useSession();
  const isAdmin = session?.user.role === "ADMIN";
  const { leaves, loading, updateLeaveStatus } = useLeave();

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-100 dark:bg-[#131313]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          {isAdmin ? "Admin Leave Panel" : "My Leave Requests"}
        </h1>

        {leaves.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No leave requests available.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                    Employee
                  </th>
                  <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                    Reason
                  </th>
                  <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                    Duration
                  </th>
                  <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                    Status
                  </th>
                  {isAdmin && (
                    <th className="px-4 py-2 text-center text-gray-700 dark:text-gray-300">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr
                    key={leave.id}
                    className="border-b border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-3 flex items-center gap-2">
                      {leave.employee.photoURL && (
                        <Image
                          src={leave.employee.photoURL}
                          alt={`${leave.employee.firstName}'s profile`}
                          width={40}
                          height={40}
                          className="rounded-full object-cover w-[40] h-[40]"
                        />
                      )}
                      <span className="text-gray-800 dark:text-gray-200 font-medium">
                        {leave.employee.firstName} {leave.employee.lastName}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {leave.employee.email}
                    </td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                      {leave.reason}
                    </td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                      {new Date(leave.startDate).toLocaleDateString()} -{" "}
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
                    {isAdmin && (
                      <td className="px-4 py-3 text-center">
                        {leave.status === "PENDING" && (
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() =>
                                updateLeaveStatus(leave.id, "APPROVED")
                              }
                              disabled={loading}
                              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 text-sm"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                updateLeaveStatus(leave.id, "REJECTED")
                              }
                              disabled={loading}
                              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 text-sm"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
