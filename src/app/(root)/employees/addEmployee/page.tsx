"use client";

import { useState } from "react";
import useAddEmployee from "./useAddEmployee";
import { User, Briefcase, FileText, Lock } from "lucide-react";
import PersonalInfo from "@/components/personalInfo/PersonalInfo";
import Documents from "@/components/documents/Documents";
import AccountAccess from "@/components/accountAccess/AccountAccess";
import ProfessionalInfo from "@/components/professionalInfo/ProfessionalInfo";
import { useRouter } from "next/navigation";

export default function AddEmployeeForm() {
  const {
    form,
    handleChange,
    handleSubmit,
    loading,
    error,
    handleFileUpload,
    // handleImageUpload,
  } = useAddEmployee();

  const [activeTab, setActiveTab] = useState(0);
const router = useRouter();
  const tabs = [
    {
      label: "Personal Information",
      icon: <User size={18} />,
      component: (
        <PersonalInfo
          form={form}
          handleChange={handleChange}
          handleFileUpload={handleFileUpload}
        />
      ),
    },
    {
      label: "Professional Information",
      icon: <Briefcase size={18} />,
      component: <ProfessionalInfo form={form} handleChange={handleChange} />,
    },
    {
      label: "Documents",
      icon: <FileText size={18} />,
      component: <Documents handleFileUpload={handleFileUpload} />,
    },
    {
      label: "Account Access",
      icon: <Lock size={18} />,
      component: <AccountAccess form={form} handleChange={handleChange} />,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#131313] text-white shadow-md rounded-lg">
      {/* Tabs Navigation */}
      <div className="flex flex-wrap border-b border-gray-700">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border-b-2 transition-all ${
              activeTab === index
                ? "border-orange-500 text-orange-500"
                : "border-transparent text-gray-400"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 p-4">{tabs[activeTab].component}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-between bg-[#131313] mt-7 p-4">
        {activeTab > 0 && (
          <button
            onClick={() => setActiveTab(activeTab - 1)}
            className="bg-gray-700 px-4 py-2 rounded text-white"
          >
            Previous
          </button>
        )}
        {activeTab < tabs.length - 1 ? (
          <button
            onClick={() => setActiveTab(activeTab + 1)}
            className="bg-customOrange px-5 py-3 rounded-xl text-white"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-green-600 px-4 py-2 rounded text-white"
            disabled={loading}
          >
            {loading ? "Adding..." : "Submit"}
          </button>
        )}
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}