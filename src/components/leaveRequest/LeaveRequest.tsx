"use client";

// import { useState, useEffect } from "react";
import { useLeaveManagement } from "@/hooks/useLeaveManagement";

export interface Leave {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  employeeId: string;
}

export default function LeaveRequestWithModal({ employeeId }: { employeeId: string }) {
  const {
    showModal,
    startDate,
    endDate,
    reason,
    loading,
    leaves,
    setShowModal,
    setStartDate,
    setEndDate,
    setReason,
    handleSubmit
  } = useLeaveManagement(employeeId);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Leave Management</h2>

      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Request Leave
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Request Leave</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Start Date:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">End Date:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Reason:</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Leave Status Display */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Your Leave Requests:</h3>
        {leaves.length === 0 ? (
          <p>No leave requests found.</p>
        ) : (
          <div className="space-y-4">
            {leaves.map((leave) => (
              <div
                key={leave.id}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <p>
                  📅 <strong>From:</strong>{" "}
                  {new Date(leave.startDate).toLocaleDateString()} -{" "}
                  {new Date(leave.endDate).toLocaleDateString()}
                </p>
                <p>📝 <strong>Reason:</strong> {leave.reason}</p>
                <p>
                  📊 <strong>Status:</strong>{" "}
                  <span
                    className={`font-bold ${
                      leave.status === "PENDING"
                        ? "text-yellow-500"
                        : leave.status === "APPROVED"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {leave.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
