"use client";

import Image from "next/image";
import { useLeave } from "@/hooks/useLeave";
import { useSession } from "next-auth/react";

export default function AdminLeavePanel() {
  const { data: session } = useSession();
  const isAdmin = session?.user.role === "ADMIN";
  const { leaves, loading, updateLeaveStatus } = useLeave();

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-100 dark:bg-[#131313]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          {isAdmin ? "Admin Leave Panel" : "My Leave Requests"}
        </h1>

        {leaves.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No leave requests available.
          </p>
        ) : (
          leaves.map((leave) => (
            <div
              key={leave.id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6"
            >
              <div className="flex items-center mb-4">
                <strong className="text-gray-700 dark:text-gray-300">
                  Employee:
                </strong>
                <span className="ml-3 flex items-center">
                  {leave.employee.photoURL && (
                    <Image
                      width={40}
                      height={40}
                      src={leave.employee.photoURL}
                      alt={leave.employee.firstName}
                      className="rounded-full w-10 h-10"
                    />
                  )}
                  <span className="ml-3 text-gray-800 dark:text-gray-200 font-medium">
                    {leave.employee.firstName} {leave.employee.lastName}
                  </span>
                </span>
                <span className="ml-auto text-gray-500 dark:text-gray-400">
                  {leave.employee.email}
                </span>
              </div>
              <div className="mb-2">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Reason:</strong> {leave.reason}
                </p>
              </div>
              <div className="mb-2">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Duration:</strong>{" "}
                  {new Date(leave.startDate).toLocaleDateString()} to{" "}
                  {new Date(leave.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Status:</strong> {leave.status}
                </p>
              </div>
              {isAdmin && leave.status === "PENDING" && (
                <div className="flex space-x-4">
                  <button
                    onClick={() => updateLeaveStatus(leave.id, "APPROVED")}
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? "Processing..." : "Approve"}
                  </button>
                  <button
                    onClick={() => updateLeaveStatus(leave.id, "REJECTED")}
                    disabled={loading}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? "Processing..." : "Reject"}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
