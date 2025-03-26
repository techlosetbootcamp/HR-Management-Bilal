import React from "react";
import { LockKeyhole } from "lucide-react";
import Image from "next/image";
import EmployeeInput from "../employeeInput/EmployeeInput";
import { PersonalInfoProps } from "@/types/empoyee";

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  form,
  handleChange,
  handleFileUpload,
}) => {
  return (
    <div className="bg-customBlack p-4 md:p-6">
      <div className="flex mb-4">
        <label className="cursor-pointer border border-gray-700 rounded-xl flex flex-col items-center">
          {form?.photoURL ? (
            <Image
              width={20}
              height={20}
              src={form?.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
          ) : (
            <span className="w-24 h-24 flex items-center justify-center">
              <LockKeyhole size={20} />
            </span>
          )}
          <input
            type="file"
            name="photoURL"
            className="hidden"
            accept="image/*"
            onChange={(e) =>
              e.target.files && handleFileUpload(e.target.files[0], "photoURL")
            }
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EmployeeInput
          type="text"
          name="firstName"
          value={form?.firstName}
          placeholder="First Name"
          onChange={handleChange}
        />
        <EmployeeInput
          type="text"
          name="lastName"
          value={form?.lastName}
          placeholder="Last Name"
          onChange={handleChange}
        />
        <EmployeeInput
          type="text"
          name="mobileNumber"
          value={form?.mobileNumber}
          placeholder="Mobile Number"
          onChange={handleChange}
        />
        <EmployeeInput
          type="email"
          name="email"
          value={form?.email}
          placeholder="Email Address"
          onChange={handleChange}
        />
        <EmployeeInput
          type="date"
          name="dateOfBirth"
          value={form?.dateOfBirth}
          placeholder="Date of Birth"
          onChange={handleChange}
        />
        <EmployeeInput
          type="select"
          name="maritalStatus"
          value={form?.maritalStatus}
          placeholder="Marital Status"
          onChange={handleChange}
          options={["Single", "Married", "Divorced"]}
        />
        <EmployeeInput
          type="select"
          name="gender"
          value={form?.gender}
          placeholder="Gender"
          onChange={handleChange}
          options={["Male", "Female", "Other"]}
        />
        <EmployeeInput
          type="select"
          name="nationality"
          value={form?.nationality}
          placeholder="Nationality"
          onChange={handleChange}
          options={["Pakistan", "Foreign"]}
        />
      </div>

      <div className="mt-4">
        <EmployeeInput
          type="text"
          name="address"
          value={form?.address}
          placeholder="Address"
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <EmployeeInput
          type="select"
          name="city"
          value={form?.city}
          placeholder="City"
          onChange={handleChange}
          options={[
            "Faisalabad",
            "Lashore",
            "Rawalpindi",
            "Islamabad",
            "Karachi",
            "Multan",
          ]}
        />
        <EmployeeInput
          type="select"
          name="state"
          value={form?.state}
          placeholder="State"
          onChange={handleChange}
          options={["Punjab", "Sindh", "Balochistan", "KPK"]}
        />
        <EmployeeInput
          type="text"
          name="zipCode"
          value={form?.zipCode}
          placeholder="ZIP Code"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PersonalInfo;
