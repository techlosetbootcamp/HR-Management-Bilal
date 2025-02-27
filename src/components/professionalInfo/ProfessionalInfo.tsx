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
        name="employeeId"
        placeholder="Employee ID"
        value={form.employeeId}
        onChange={handleChange}
      />
      
      <InputField
        name="userName"
        placeholder="User Name"
        value={form.userName}
        onChange={handleChange}
      />

      <select
        name="employmentType"
        value={form.employmentType}
        onChange={handleChange}
        className="bg-[#131313] border border-gray-700 rounded-md p-2 text-gray-300"
      >
        <option value="">Select Employee Type</option>
        <option value="Office">Office</option>
        <option value="Remote">Remote</option>
      </select>

      <InputField
        type="email"
        name="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
      />

      <select
        name="department"
        value={form.department}
        onChange={handleChange}
        className="bg-[#131313] border border-gray-700 rounded-md p-2 text-gray-300"
      >
        <option value="">Select Department</option>
        <option value="Full Stack Developer">Full Stack Developer</option>
        <option value="UI/X Design">UI/X Design</option>
        <option value="HR Manager">HR Manager</option>
        <option value="Project Manager">Project Manager</option>
        <option value="Python Developer">Python Developer</option>
        <option value="Node Developer">Node Developer</option>

      </select>

      <InputField
        name="designation"
        placeholder="Enter Designation"
        value={form.designation}
        onChange={handleChange}
      />

      <select
        name="workingDays"
        value={form.workingDays}
        onChange={handleChange}
        className="bg-[#131313] border border-gray-700 rounded-md p-2 text-gray-300"
      >
        <option value="">Select Working Days</option>
        <option value="Monday-Friday">Monday-Friday</option>
        <option value="Sunday-Thursday">Sunday-Thursday</option>
        <option value="Flexible">Flexible</option>
      </select>

      <InputField
        type="date"
        name="joiningDate"
        value={form.joiningDate}
        onChange={handleChange}
      />

      <InputField
        name="officeLocation"
        placeholder="Office Location"
        value={form.officeLocation}
        onChange={handleChange}
        className="col-span-2"
      />
    </div>
  );
}