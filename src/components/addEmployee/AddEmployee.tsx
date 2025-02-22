"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addEmployee } from "@/redux/slice/employeeSlice";

export default function AddEmployeeForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.employees);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    designation: "",
    department: "",
    joiningDate: "",
    employmentType: "",
    salarySlip: "",
    gender: "Male",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    nationality: "",
    officeLocation: "",
    maritalStatus: "",
    appointmentLetter: "",
    experienceLetter: "",
    relivingLetter: "",
    photoURL: "",
    skypeId: "",
    slackId: "",
    githubId: "",
    userName: "",
    employeeId: "",
    workingDays: "",
    attendance: "",
    checkIn: "",
    checkOut: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addEmployee(form));
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} className="border p-2 rounded w-full" required />
          <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className="border p-2 rounded w-full" required />
        </div>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2 rounded w-full" required />
        <input type="text" name="mobileNumber" placeholder="Mobile Number" value={form.mobileNumber} onChange={handleChange} className="border p-2 rounded w-full" />
        
        <input type="text" name="designation" placeholder="Designation" value={form.designation} onChange={handleChange} className="border p-2 rounded w-full" />
        <input type="text" name="department" placeholder="Department" value={form.department} onChange={handleChange} className="border p-2 rounded w-full" />

        <input type="date" name="joiningDate" value={form.joiningDate} onChange={handleChange} className="border p-2 rounded w-full" />

        <select name="employmentType" value={form.employmentType} onChange={handleChange} className="border p-2 rounded w-full">
          <option value="">Select Employment Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Intern">Intern</option>
          <option value="Contract">Contract</option>
        </select>

        <select name="gender" value={form.gender} onChange={handleChange} className="border p-2 rounded w-full">
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} className="border p-2 rounded w-full" />

        <select name="maritalStatus" value={form.maritalStatus} onChange={handleChange} className="border p-2 rounded w-full">
          <option value="">Select Marital Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
        </select>

        <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} className="border p-2 rounded w-full" />
        <input type="text" name="zipCode" placeholder="Zip Code" value={form.zipCode} onChange={handleChange} className="border p-2 rounded w-full" />
        <input type="text" name="workingDays" placeholder="Working Days" value={form.workingDays} onChange={handleChange} className="border p-2 rounded w-full" />

        <input type="text" name="skypeId" placeholder="Skype ID" value={form.skypeId} onChange={handleChange} className="border p-2 rounded w-full" />
        <input type="text" name="slackId" placeholder="Slack ID" value={form.slackId} onChange={handleChange} className="border p-2 rounded w-full" />
        <input type="text" name="githubId" placeholder="GitHub ID" value={form.githubId} onChange={handleChange} className="border p-2 rounded w-full" />

        <input type="text" name="officeLocation" placeholder="Office Location" value={form.officeLocation} onChange={handleChange} className="border p-2 rounded w-full" />
        <input type="text" name="nationality" placeholder="Nationality" value={form.nationality} onChange={handleChange} className="border p-2 rounded w-full" />
        
        <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} className="border p-2 rounded w-full" />
        <input type="text" name="state" placeholder="State" value={form.state} onChange={handleChange} className="border p-2 rounded w-full" />

        <input type="text" name="userName" placeholder="Username" value={form.userName} onChange={handleChange} className="border p-2 rounded w-full" />
        <input type="text" name="employeeId" placeholder="Employee ID" value={form.employeeId} onChange={handleChange} className="border p-2 rounded w-full" />

        <input type="file" name="salarySlip" placeholder='' onChange={handleChange} className="border p-2 rounded w-full" />
        
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded w-full" disabled={loading}>
          {loading ? "Adding..." : "Add Employee"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
