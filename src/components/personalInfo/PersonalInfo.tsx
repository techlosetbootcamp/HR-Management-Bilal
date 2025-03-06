import React from "react";
import { Camera } from "lucide-react";
import InputField from "../infoInput/InfoInput";
import Image from "next/image";

interface PersonalInfoProps {
  form: {
    firstName: string;
    lastName: string;
    mobileNumber: string;
    email: string;
    dateOfBirth: string;
    maritalStatus: string;
    gender: string;
    nationality: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    photoURL?: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleFileUpload: (fieldName: string, file: File) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  form,
  handleChange,
  handleFileUpload,
}) => {
  return (
    <div className="bg-[#131313] p-4 md:p-6">
      <div className="flex justify-center mb-4">
        <label className="cursor-pointer border p-4 rounded-lg flex flex-col items-center">
          {form.photoURL ? (
            <Image
              width={20}
              height={20}
              src={form.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
          ) : (
            <>
              <Camera size={30} className="text-gray-400" />
              <span className="text-sm text-gray-400">Upload</span>
            </>
          )}
          <input
            type="file"
            name="photoURL"
            className="hidden"
            accept="image/*"
            onChange={(e) =>
              e.target.files && handleFileUpload("photoURL", e.target.files[0])
            }
          />
        </label>
      </div>

      {/* Personal Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="First Name"
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
        />
        <InputField
          label="Last Name"
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
        />
        <InputField
          label="Mobile Number"
          type="text"
          name="mobileNumber"
          value={form.mobileNumber}
          onChange={handleChange}
        />
        <InputField
          label="Email Address"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <InputField
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
        />
        <InputField
          label="Marital Status"
          type="select"
          name="maritalStatus"
          value={form.maritalStatus}
          onChange={handleChange}
          options={["Single", "Married", "Divorced"]}
        />
        <InputField
          label="Gender"
          type="select"
          name="gender"
          value={form.gender}
          onChange={handleChange}
          options={["Male", "Female", "Other"]}
        />
        <InputField
          label="Nationality"
          type="select"
          name="nationality"
          value={form.nationality}
          onChange={handleChange}
          options={["Pakistan", "Foreign"]}
        />
      </div>

      <InputField
        label="Address"
        type="text"
        name="address"
        value={form.address}
        onChange={handleChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <InputField
          label="City"
          type="select"
          name="city"
          value={form.city}
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
        <InputField
          label="State"
          type="select"
          name="state"
          value={form.state}
          onChange={handleChange}
          options={["Punjab", "Sindh", "Balochistan", "KPK"]}
        />
        <InputField
          label="ZIP Code"
          type="text"
          name="zipCode"
          value={form.zipCode}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PersonalInfo;
