import React from "react";
import EmployeeInput from "../employeeInput/EmployeeInput";
import { ProfessionalInfoProps } from "@/types/empoyee";
export default function ProfessionalInfo({
  form,
  handleChange,
}: ProfessionalInfoProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-6">
      <EmployeeInput
        name="employeeId"
        placeholder="Employee ID"
        value={form?.employeeId}
        onChange={handleChange}
      />

      <EmployeeInput
        name="userName"
        placeholder="User Name"
        value={form?.userName}
        onChange={handleChange}
      />
      <EmployeeInput
        name="employmentType"
        type="select"
        value={form?.employmentType || ""}
        options={["Office", "Remote"]}
        onChange={handleChange}
      />
      <EmployeeInput
        name="email"
        placeholder="Email Address"
        value={form?.email}
        onChange={handleChange}
      />
      <EmployeeInput
        name="department"
        type="select"
        value={form?.department || ""}
        options={["Design", "Development", "HR", "Sales"]}
        onChange={handleChange}
      />

      <EmployeeInput
        name="designation"
        type="select"
        value={form?.designation || ""}
        options={[
          "UI/X Designer",
          "PHP Developer",
          "HR Executive",
          "HR Cordinator",
          "HR Assistant",
          "Sales Manager",
          "BDM",
          "Sales Engineer",
          "Director of Sales",
          "Next JS Developer",
          "Node JS Developer",
          "Design Lead",
        ]}
        onChange={handleChange}
      />
      <EmployeeInput
        name="workingDays"
        type="select"
        value={form?.workingDays || ""}
        options={["Monday-Friday", "Sunday-Thursday", "Flexible"]}
        onChange={handleChange}
      />
      <EmployeeInput
        name="status"
        type="select"
        value={form?.status || ""}
        options={["Permanent", "Contract"]}
        onChange={handleChange}
      />
      <EmployeeInput
        type="date"
        name="joiningDate"
        value={form?.joiningDate}
        onChange={handleChange}
      />

      <EmployeeInput
        name="officeLocation"
        type="select"
        value={form?.officeLocation || ""}
        options={[
          "Faisalabad",
          "Lahore",
          "Islamabad",
          "Karachi",
          "Rawalpindi",
          "Multan",
        ]}
        onChange={handleChange}
      />
    </div>
  );
}
