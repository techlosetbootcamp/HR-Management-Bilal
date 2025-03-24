"use client";

import { AttendanceModalFormProps } from "@/types/attandance";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import EmployeeInput from "../employeeInput/EmployeeInput";

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
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-[1001]"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="dark:bg-[#131313] bg-white p-6 rounded-lg shadow-lg w-96 relative z-[1002]"
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600 dark:bg-[#131313] w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 shadow-md z-[1003]"
              onClick={onClose}
            >
              <X size={24} />
            </button>

            <h2 className="text-lg font-semibold mb-4">
              Mark Attendance for {selectedEmployee.firstName}{" "}
              {selectedEmployee.lastName}
            </h2>
            <form onSubmit={onSubmit} className="space-y-3">
              <EmployeeInput
                label="Date"
                type="date"
                name="date"
                value={attendanceState.date}
                onChange={(e) => updateAttendanceState("date", e.target.value)}
              />

              <EmployeeInput
                label="Check In"
                type="time"
                name="checkIn"
                value={attendanceState.checkIn}
                onChange={(e) =>
                  updateAttendanceState("checkIn", e.target.value)
                }
              />

              <EmployeeInput
                label="Check Out"
                type="time"
                name="checkOut"
                value={attendanceState.checkOut}
                onChange={(e) =>
                  updateAttendanceState("checkOut", e.target.value)
                }
              />

              <EmployeeInput
                label="Break Time (HH:MM)"
                type="text"
                name="breakTime"
                value={attendanceState.breakTime}
                onChange={(e) =>
                  updateAttendanceState("breakTime", e.target.value)
                }
                placeholder="e.g., 01:30"
              />

              <EmployeeInput
                label="Working Hours (HH:MM)"
                type="text"
                name="manualWorkingHours"
                value={attendanceState.manualWorkingHours}
                onChange={(e) =>
                  updateAttendanceState("manualWorkingHours", e.target.value)
                }
                placeholder="e.g., 07:30"
              />

              <EmployeeInput
                label="Status"
                type="select"
                name="status"
                value={attendanceState.status}
                onChange={(e) =>
                  updateAttendanceState("status", e.target.value)
                }
                options={["", "ON_TIME", "LATE", "ABSENT"]}
              />

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
