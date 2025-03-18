"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Type definitions
interface Leave {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  employee: {
    firstName: string;
    lastName: string;
    photoURL: string;
    email: string;
  };
}

export default function AdminLeavePanel() {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch all leave requests
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await fetch("/api/leaves");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch leaves");
        }

        setLeaves(data.leaves);
      } catch (error) {
        alert((error as Error).message);
      }
    };
    fetchLeaves();
  }, []);

  // Update leave status (Approve/Reject)
  const updateLeaveStatus = async (
    leaveId: string,
    status: "APPROVED" | "REJECTED"
  ) => {
    setLoading(true);
    try {
      const response = await fetch("/api/leaves", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leaveId, status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update leave status");
      }

      // Update the local state to reflect the status change
      setLeaves((prev) =>
        prev.map((leave) =>
          leave.id === leaveId ? { ...leave, status } : leave
        )
      );

      alert(`Leave ${status.toLowerCase()} successfully!`);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Admin Leave Panel</h1>

      {leaves.length === 0 ? (
        <p>No leave requests available.</p>
      ) : (
        // In your leave mapping:
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
