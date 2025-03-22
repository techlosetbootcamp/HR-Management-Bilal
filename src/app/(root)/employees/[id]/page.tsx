"use client";

import EmployeeDetails from "@/components/employeeDetails/EmployeeDetails";
import { useSearchParams, useParams } from "next/navigation";

export default function EmployeeDetailsPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("edit") === "true";

  const employeeEmail = searchParams.get("email") || "";
  return (
    <EmployeeDetails
      id={id as string}
      isEditMode={isEditMode}
      employeeEmail={employeeEmail}
    />
  );
}
