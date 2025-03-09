import React from "react";
import InputField from "../infoInput/InfoInput";

interface ProfessionalInfoProps {
  form: {
    employeeId: string;
    userName: string;
    employmentType: string;
    email: string;
    department: string;
    designation: string;
    workingDays: string;
    joiningDate: string;
    officeLocation: string;
    status: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export default function ProfessionalInfo({
  form,
  handleChange,
}: ProfessionalInfoProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-6">
      <InputField
        label="Employee ID"
        name="employeeId"
        placeholder="Employee ID"
        value={form.employeeId}
        onChange={handleChange}
      />

      <InputField
        label="User Name"
        name="userName"
        placeholder="User Name"
        value={form.userName}
        onChange={handleChange}
      />
      <InputField
        label="Employee Type"
        name="employmentType"
        type="select"
        value={form.employmentType || ""}
        options={["Office", "Remote"]}
        onChange={handleChange}
      />
      <InputField
        label="Email Address"
        name="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
      />
      <InputField
        label="Department"
        name="department"
        type="select"
        value={form.department || ""}
        options={["Design", "Development", "HR", "Sales"]}
        onChange={handleChange} // Fix applied
      />

      <InputField
        label="Designation"
        name="designation"
        type="select"
        value={form.designation || ""}
        options={[
          "UI/X Designer",
          "PHP Developer",
          "HR Executive",
          "HR Cordinator",
          "HR Assistant",
          "Sales Manager",
          "BDM",
          "Sales Engineer",
          "Dirextor of Sales",
          "Next JS Developer",
          "Node JS Developer",
          "Design Lead",
        ]}
        onChange={handleChange}
      />
      <InputField
        label="Working Days"
        name="workingDays"
        type="select"
        value={form.workingDays || ""}
        options={["Monday-Friday", "Sunday-Thursday", "Flexible"]}
        onChange={handleChange} // Fix applied
      />
      <InputField
        label="Employee Status"
        name="status"
        type="select"
        value={form.status || ""}
        options={["Permanent", "Contract"]}
        onChange={handleChange} // Fix applied
      />
      <InputField
        label="Date of Joining"
        type="date"
        name="joiningDate"
        value={form.joiningDate}
        onChange={handleChange}
      />

      <InputField
        label="Office Location"
        name="officeLocation"
        type="select"
        value={form.officeLocation || ""}
        options={[
          "Faisalabad",
          "Lahore",
          "Islamabad",
          "Karachi",
          "Rawalpindi",
          "Multan",
        ]}
        onChange={handleChange} // Fix applied
      />
    </div>
  );
}
