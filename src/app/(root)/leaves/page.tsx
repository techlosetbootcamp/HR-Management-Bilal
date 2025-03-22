"use client";
import React from "react";
import { useLeave } from "@/hooks/useLeave";
import { useSession } from "next-auth/react";
import LeaveRecord from "@/components/leaveRecord/LeaveRecord";

export default function AdminLeavePanel() {
  const { data: session } = useSession();
  const isAdmin = session?.user.role === "ADMIN";
  const { leaves, loading, updateLeaveStatus } = useLeave();

  return (
    <div className="dark:bg-[#131313] border dark:border-gray-700 p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          {isAdmin ? "Admin Leave Panel" : "My Leave Requests"}
        </h1>

        {leaves.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No leave requests available.
          </p>
        ) : (
          <LeaveRecord
            leaves={leaves}
            loading={loading}
            isAdmin={isAdmin}
            updateLeaveStatus={updateLeaveStatus}
          />
        )}
    </div>
  );
}