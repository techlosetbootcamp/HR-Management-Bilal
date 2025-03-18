"use client";

import { useState, useEffect } from "react";

export interface Leave {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export default function LeaveRequestWithModal() {
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [leaves, setLeaves] = useState<Leave[]>([]);

  // Fetch leaves for the logged-in employee
  const fetchLeaves = async () => {
    try {
      const response = await fetch("/api/leaves");
      const data = await response.json();
      if (response.ok) {
        setLeaves(data.leaves); // Assuming API filters by employeeId
      } else {
        throw new Error(data.error || "Failed to fetch leaves");
      }
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // Handle leave request submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (new Date(startDate) > new Date(endDate)) {
      alert("End date must be after the start date.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/leaves", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startDate, endDate, reason }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to request leave");

      alert("Leave requested successfully!");
      setStartDate("");
      setEndDate("");
      setReason("");
      setShowModal(false);
      fetchLeaves(); // Refresh leave list after submitting
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Leave Management</h2>

      {/* Button to open the modal */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Request Leave
      </button>

      {/* Leave Request Modal */}
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
