import React from "react";
import { Calendar, UploadCloud } from "lucide-react";
import InputField from "../infoInput/InfoInput";

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
    <div className="space-y-4">
      <div className="flex justify-center">
        <label className="cursor-pointer border p-4 rounded-lg flex flex-col items-center">
          <UploadCloud size={30} className="text-gray-400" />
          <span className="text-sm text-gray-400">Upload Profile Picture</span>
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

      <div className="grid grid-cols-2 gap-4">
        <InputField label="First Name" type="text" name="firstName" value={form.firstName} onChange={handleChange} />
        <InputField label="Last Name" type="text" name="lastName" value={form.lastName} onChange={handleChange} />
        <InputField label="Mobile Number" type="text" name="mobileNumber" value={form.mobileNumber} onChange={handleChange} />
        <InputField label="Email Address" type="email" name="email" value={form.email} onChange={handleChange} />
        <InputField label="Date of Birth" type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} icon={<Calendar size={18} />} />
        <InputField label="Marital Status" type="select" name="maritalStatus" value={form.maritalStatus} onChange={handleChange} options={["Single", "Married", "Divorced"]} />
        <InputField label="Gender" type="select" name="gender" value={form.gender} onChange={handleChange} options={["Male", "Female", "Other"]} />
        <InputField label="Nationality" type="text" name="nationality" value={form.nationality} onChange={handleChange} />
      </div>

      <InputField label="Address" type="text" name="address" value={form.address} onChange={handleChange} />

      <div className="grid grid-cols-3 gap-4">
        <InputField label="City" type="text" name="city" value={form.city} onChange={handleChange} />
        <InputField label="State" type="text" name="state" value={form.state} onChange={handleChange} />
        <InputField label="ZIP Code" type="text" name="zipCode" value={form.zipCode} onChange={handleChange} />
      </div>
    </div>
  );
};

export default PersonalInfo;
