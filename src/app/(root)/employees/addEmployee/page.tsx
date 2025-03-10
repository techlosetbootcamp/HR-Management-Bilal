"use client";

import { useState } from "react";
import useAddEmployee from "./useAddEmployee";
import { User, Briefcase, FileText, Lock } from "lucide-react";
import PersonalInfo from "@/components/personalInfo/PersonalInfo";
import Documents from "@/components/documents/Documents";
import AccountAccess from "@/components/accountAccess/AccountAccess";
import ProfessionalInfo from "@/components/professionalInfo/ProfessionalInfo";

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
  const tabs = [
    {
      label: "Personal Information",
      icon: <User size={24} />,
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
      icon: <Briefcase size={24} />,
      component: <ProfessionalInfo form={form} handleChange={handleChange} />,
    },
    {
      label: "Documents",
      icon: <FileText size={24} />,
      component: <Documents handleFileUpload={handleFileUpload} />,
    },
    {
      label: "Account Access",
      icon: <Lock size={24} />,
      component: <AccountAccess form={form} handleChange={handleChange} />,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#131313] text-white shadow-md rounded-lg">
      <div className="flex flex-wrap border-b border-gray-700 w-full">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex items-center gap-3 px-5 py-2 text-sm font-semibold border-b-2 transition-all ${
              activeTab === index
                ? "border-orange-500 text-orange-500 text-[18px]"
                : "border-transparent text-[18px]"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="">{tabs[activeTab].component}</div>

      <div className="flex float-end bg-[#131313]">
        {activeTab > 0 && (
          <button
            onClick={() => setActiveTab(activeTab - 1)}
            className="bg-[#131313] px-4 py-3 text-white border-gray-700 border rounded-xl mr-3"
          >
            Previous
          </button>
        )}
        {activeTab < tabs.length - 1 ? (
          <button
            onClick={() => setActiveTab(activeTab + 1)}
            className="mr-4 bg-customOrange hover:bg-[#131313] hover:text-customOrange border transition-all ease-in-out border-customOrange px-4 py-3 rounded-xl text-white"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-customOrange hover:bg-[#131313] hover:text-customOrange border transition-all ease-in-out border-customOrange px-5 py-3 rounded-xl text-white"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
          </button>
        )}
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}