"use client";

import { useEmployeeDetails } from "@/hooks/useEmployeeDetails";
import EditableInput from "../editableInput/EditableInput";
import { useState } from "react";
import EditableSelect from "../editableSelect/EditableSelect";

interface EmployeeDetailsProps {
  id: string;
  isEditMode: boolean;
}

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({
  id,
  isEditMode,
}) => {
  const { employee, loading, error, handleUpdate,saveChanges } = useEmployeeDetails(id);
  const [activeTab, setActiveTab] = useState("personal");

  if (loading) return <p className="text-white">Loading employee details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;


  
  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg max-w-3xl mx-auto shadow-lg">
      <h2 className="text-xl font-bold mb-4">
        {isEditMode ? "Edit Employee" : "Employee Details"}
      </h2>

      {employee && (
        <>
          <div className="flex justify-center mb-4">
            <img
              src={employee.photoURL || "/default-avatar.png"}
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-around mb-6 border-b border-gray-700">
            <button
              className={`px-4 py-2 ${
                activeTab === "personal"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : ""
              }`}
              onClick={() => setActiveTab("personal")}
            >
              Personal Information
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "professional"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : ""
              }`}
              onClick={() => setActiveTab("professional")}
            >
              Professional Information
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "documents"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : ""
              }`}
              onClick={() => setActiveTab("documents")}
            >
              Documents
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "account"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : ""
              }`}
              onClick={() => setActiveTab("account")}
            >
              Account Access
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "personal" && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">
                Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <EditableInput
                  label="First Name"
                  value={employee.firstName}
                  isEditMode={isEditMode}
                  onChange={(value) => handleUpdate("firstName", value)}
                />
                <EditableInput
                  label="Last Name"
                  value={employee.lastName}
                  isEditMode={isEditMode}
                  onChange={(value) => handleUpdate("lastName", value)}
                />
                <EditableInput
                  label="Mobile Number"
                  value={employee.mobileNumber}
                  isEditMode={isEditMode}
                  onChange={(value) => handleUpdate("email", value)}
                />
                <EditableInput
                  label="Email Address"
                  value={employee.email}
                  isEditMode={isEditMode}
                  onChange={(value) => handleUpdate("email", value)}
                />

                <EditableInput
                  label="Date of Birth"
                  value={employee.dateOfBirth}
                  isEditMode={isEditMode}
                  onChange={(value) => handleUpdate("dateOfBirth", value)}
                />
                <EditableSelect
                  label="Marital Status"
                  value={employee.maritalStatus || ""}
                  options={["Single", "Married"]}
                  isEditMode={isEditMode}
                  onChange={(value) => handleUpdate("maritalStatus", value)}
                />
                <EditableSelect
                  label="Gender"
                  value={employee.maritalStatus || ""}
                  options={["Male", "Female"]}
                  isEditMode={isEditMode}
                  onChange={(value) => handleUpdate("gender", value)}
                />
                <EditableInput
                  label="Nationality"
                  value={employee.nationality}
                  isEditMode={isEditMode}
                  onChange={(value) => handleUpdate("nationality", value)}
                />
                <EditableInput
                  label="Address"
                  value={employee.address}
                  isEditMode={isEditMode}
                  onChange={(value) => handleUpdate("address", value)}
                />
                <EditableInput
                  label="City"
                  value={employee.city}
                  isEditMode={isEditMode}
                  onChange={(value) => handleUpdate("city", value)}
                />
                <EditableInput
                  label="State"
                  value={employee.state}
                  isEditMode={isEditMode}
                  onChange={(value) => handleUpdate("state", value)}
                />
                <EditableInput
                  label="Zip Code"
                  value={employee.zipCode}
                  isEditMode={isEditMode}
                  onChange={(value) => handleUpdate("zipCode", value)}
                />
              </div>
              <button onClick={saveChanges}>Submit</button>
            </div>
          )}

          {activeTab === "professional" && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">
                Professional Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <EditableInput
                  label="Designation"
                  value={employee.designation}
                  isEditMode={isEditMode}
                  onChange={(value) => handleUpdate("designation", value)}
                />
                <EditableInput
                  label="Department"
                  value={employee.department}
                  isEditMode={isEditMode}
                  onChange={(value) => handleUpdate("department", value)}
                />
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Documents</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Add fields related to documents here */}
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Account Access</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Add fields related to account access here */}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EmployeeDetails;
