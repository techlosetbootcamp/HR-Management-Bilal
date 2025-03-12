import React from "react";
import { LockKeyhole} from "lucide-react";
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
  handleFileUpload: (file: File, field: string) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  form,
  handleChange,
  handleFileUpload,
}) => {
  return (
    <div className="bg-[#131313] p-4 md:p-6">
      <div className="flex mb-4">
        <label className="cursor-pointer border border-gray-700 rounded-xl flex flex-col items-center">
          {form.photoURL ? (
            <Image
              width={20}
              height={20}
              src={form.photoURL}
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
        <InputField
          type="text"
          name="firstName"
          value={form.firstName}
          placeholder="First Name"
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="lastName"
          value={form.lastName}
          placeholder="Last Name"
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="mobileNumber"
          value={form.mobileNumber}
          placeholder="Mobile Number"
          onChange={handleChange}
        />
        <InputField
          type="email"
          name="email"
          value={form.email}
          placeholder="Email Address"
          onChange={handleChange}
        />
        <InputField
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          placeholder="Date of Birth"
          onChange={handleChange}
        />
        <InputField
          type="select"
          name="maritalStatus"
          value={form.maritalStatus}
          placeholder="Marital Status"
          onChange={handleChange}
          options={["Single", "Married", "Divorced"]}
        />
        <InputField
          type="select"
          name="gender"
          value={form.gender}
          placeholder="Gender"
          onChange={handleChange}
          options={["Male", "Female", "Other"]}
        />
        <InputField
          type="select"
          name="nationality"
          value={form.nationality}
          placeholder="Nationality"
          onChange={handleChange}
          options={["Pakistan", "Foreign"]}
        />
      </div>

      <div className="mt-4">
      <InputField
        type="text"
        name="address"
        value={form.address}
        placeholder="Address"
        onChange={handleChange}
      />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <InputField
          type="select"
          name="city"
          value={form.city}
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
        <InputField
          type="select"
          name="state"
          value={form.state}
          placeholder="State"
          onChange={handleChange}
          options={["Punjab", "Sindh", "Balochistan", "KPK"]}
        />
        <InputField
          type="text"
          name="zipCode"
          value={form.zipCode}
          placeholder="ZIP Code"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PersonalInfo;
