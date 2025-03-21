// pages/attandance/index.tsx (or similar)
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import AttandanceOverview from "@/components/attandanceOverview/AttandanceOverview";
import Button from "@/components/button/Button";

export default function AttendancePage() {
  const router = useRouter();

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1>All Attandance</h1>
        <Button onClick={() => {
          router.push("/attandance/markAttandance");
        }} className="w-[200px]">Mark Attandance</Button>
      </div>
      <AttandanceOverview showViewAll={false} showPagination={true}/> {/* No limit prop passed, so all records are shown */}
    </div>
  );
}
