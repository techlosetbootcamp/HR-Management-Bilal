"use client";

import Image from "next/image";
import { useLeave } from "@/hooks/useLeave";

export default function AdminLeavePanel() {
  const { leaves, loading, updateLeaveStatus } = useLeave();

  return (
    <div>
      <h1>Admin Leave Panel</h1>

      {leaves.length === 0 ? (
        <p>No leave requests available.</p>
      ) : (
        <>
          {leaves.map((leave) => (
            <div key={leave.id} className="border rounded-lg p-4 mb-4 bg-white shadow">
              <div className="flex items-center mb-4">
                <strong>Employee: </strong>
                <span className="ml-2">
                  {leave.employee.photoURL && (
                    <Image
                      width={30}
                      height={30}
                      src={leave.employee.photoURL}
                      alt={leave.employee.firstName}
                      className="rounded-full w-12 h-12"
                    />
                  )}
                  {leave.employee.firstName} {leave.employee.lastName}
                </span>
                <span className="ml-4 text-gray-600">{leave.employee.email}</span>
              </div>
              <p><strong>Reason:</strong> {leave.reason}</p>
              <p><strong>Duration:</strong> {new Date(leave.startDate).toLocaleDateString()} to {new Date(leave.endDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {leave.status}</p>
              
              {leave.status === "PENDING" && (
                <>
                  <button
                    onClick={() => updateLeaveStatus(leave.id, "APPROVED")}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Approve"}
                  </button>
                  <button
                    onClick={() => updateLeaveStatus(leave.id, "REJECTED")}
                    disabled={loading}
                    style={{ marginLeft: "10px" }}
                  >
                    {loading ? "Processing..." : "Reject"}
                  </button>
                </>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
