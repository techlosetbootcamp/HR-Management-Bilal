import React from "react";
import EmployeeInput from "../employeeInput/EmployeeInput";
import { AccountAccessProps } from "@/types/empoyee";



export default function AccountAccess({ form, handleChange }: AccountAccessProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-6">
      <EmployeeInput
        type="email"
        name="email"
        placeholder="Enter Email Address"
        value={form.email}
        onChange={handleChange}
      />
      
      <EmployeeInput
        name="slackId"
        placeholder="Enter Slack ID"
        value={form.slackId}
        onChange={handleChange}
      />

      <EmployeeInput
        name="skypeId"
        placeholder="Enter Skype ID"
        value={form.skypeId}
        onChange={handleChange}
      />

      <EmployeeInput
        name="githubId"
        placeholder="Enter Github ID"
        value={form.githubId}
        onChange={handleChange}
      />
    </div>
  );
}