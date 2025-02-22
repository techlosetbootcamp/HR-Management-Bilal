import React from "react";
import InputField from "../infoInput/InfoInput";

interface ProfessionalInfoProps {
  form: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function ProfessionalInfo({ form, handleChange }: ProfessionalInfoProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Professional Information</h3>
      <InputField name="designation" placeholder="Designation" value={form.designation} onChange={handleChange} />
      <InputField name="department" placeholder="Department" value={form.department} onChange={handleChange} />
      <InputField type="date" name="joiningDate" value={form.joiningDate} onChange={handleChange} />
      <select name="employmentType" value={form.employmentType} onChange={handleChange} className="border p-2 rounded w-full">
        <option value="">Select Employment Type</option>
        <option value="Full-Time">Full-Time</option>
        <option value="Part-Time">Part-Time</option>
        <option value="Intern">Intern</option>
        <option value="Contract">Contract</option>
      </select>
      <InputField name="workingDays" placeholder="Working Days" value={form.workingDays} onChange={handleChange} />
      <InputField name="officeLocation" placeholder="Office Location" value={form.officeLocation} onChange={handleChange} />
    </div>
  );
}
