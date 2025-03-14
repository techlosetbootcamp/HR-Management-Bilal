// components/AttendanceModalForm.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AttendanceFormState, Employee } from "@/app/(root)/attendance/useAttandance";

interface AttendanceModalFormProps {
    selectedEmployee: Employee | null;
    showModal: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    updateAttendanceState: <K extends keyof AttendanceFormState>(
      field: K,
      value: AttendanceFormState[K]
    ) => void;
    attendanceState: AttendanceFormState;
  }

export default function AttendanceModalForm({
  selectedEmployee,
  showModal,
  onClose,
  onSubmit,
  updateAttendanceState,
  attendanceState,
}: AttendanceModalFormProps) {
  return (
    <AnimatePresence>
      {showModal && selectedEmployee && (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-[1001]" // Higher z-index
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-[1002]" // Higher z-index
        >
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-red-600 bg-white w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 shadow-md z-[1003]" // Higher z-index
            onClick={onClose}
          >
            ✖
          </button>

            <h2 className="text-lg font-semibold mb-4">
              Mark Attendance for {selectedEmployee.firstName}{" "}
              {selectedEmployee.lastName}
            </h2>
            <form onSubmit={onSubmit} className="space-y-3">
              <label className="block">Date:</label>
              <input
                type="date"
                value={attendanceState.date}
                onChange={(e) => updateAttendanceState("date", e.target.value)}
                className="w-full border p-2 rounded"
              />
              <label className="block">Check In:</label>
              <input
                type="time"
                value={attendanceState.checkIn}
                onChange={(e) => updateAttendanceState("checkIn", e.target.value)}
                className="w-full border p-2 rounded"
              />
              <label className="block">Check Out:</label>
              <input
                type="time"
                value={attendanceState.checkOut}
                onChange={(e) => updateAttendanceState("checkOut", e.target.value)}
                className="w-full border p-2 rounded"
              />
              <label className="block">Break Time (HH:MM):</label>
              <input
                type="text"
                value={attendanceState.breakTime}
                onChange={(e) => updateAttendanceState("breakTime", e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="e.g., 01:30"
              />
              <label className="block">Working Hours (HH:MM):</label>
              <input
                type="text"
                value={attendanceState.manualWorkingHours}
                onChange={(e) =>
                  updateAttendanceState("manualWorkingHours", e.target.value)
                }
                className="w-full border p-2 rounded"
                placeholder="e.g., 07:30"
              />
              <label className="block">Status:</label>
              <select
                value={attendanceState.status}
                onChange={(e) => updateAttendanceState("status", e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Status</option>
                <option value="ON_TIME">On Time</option>
                <option value="LATE">Late</option>
                <option value="ABSENT">Absent</option>
                <option value="LEAVE">Leave</option>
              </select>
              <button
                type="submit"
                className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600"
                disabled={attendanceState.loading}
              >
                {attendanceState.loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}