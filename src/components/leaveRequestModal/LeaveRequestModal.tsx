"use client";
import { useLeaveManagement } from "@/components/leaveRequestModal/useLeaveManagement";
import EmployeeInput from "../employeeInput/EmployeeInput";
import { motion, AnimatePresence } from "framer-motion";
import LeaveRecord from "@/components/leaveRecord/LeaveRecord";
import Button from "../button/Button";

export default function LeaveRequestModal({
  employeeId,
}: {
  employeeId: string;
}) {
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
    handleSubmit,
  } = useLeaveManagement(employeeId);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Leave Management</h2>

      <div className="w-[200px]">
        <Button onClick={() => setShowModal(true)}>Request Leave</Button>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-customBlack p-8 rounded-lg shadow-lg max-w-md w-full"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-red-600 dark:bg-customBlack w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 shadow-md"
                onClick={() => setShowModal(false)}
              >
                X
              </button>

              <h3 className="text-xl font-semibold mb-4">Request Leave</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <EmployeeInput
                  label="Start Date"
                  type="date"
                  name="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />

                <EmployeeInput
                  label="End Date"
                  type="date"
                  name="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />

                <EmployeeInput
                  label="Reason"
                  type="text"
                  name="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />

                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-customOrange text-white px-4 py-2 rounded-lg dark:hover:bg-customBlack hover:bg-white hover:text-customOrange border border-customOrange transition-all duration-300"
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Your Leave Requests:</h3>
        <LeaveRecord
          leaves={leaves}
          loading={loading}
          isAdmin={false}
          showEmployeeDetails={false}
        />
      </div>
    </div>
  );
}
