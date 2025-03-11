import { User, Briefcase, FileText, Lock } from "lucide-react";
import PersonalInfo from "@/components/personalInfo/PersonalInfo";
import Documents from "@/components/documents/Documents";
import AccountAccess from "@/components/accountAccess/AccountAccess";
import ProfessionalInfo from "@/components/professionalInfo/ProfessionalInfo";
import React from "react";

interface TabConfig {
  key: string;
  label: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

export const getAddEmployeeTabs = (
  form: any,
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
  handleFileUpload: (file: File, field: string) => void
): TabConfig[] => {
  return [
    {
      key: "0",
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
      key: "1",
      label: "Professional Information",
      icon: <Briefcase size={24} />,
      component: <ProfessionalInfo form={form} handleChange={handleChange} />,
    },
    {
      key: "2",
      label: "Documents",
      icon: <FileText size={24} />,
      component: <Documents handleFileUpload={handleFileUpload} />,
    },
    {
      key: "3",
      label: "Account Access",
      icon: <Lock size={24} />,
      component: <AccountAccess form={form} handleChange={handleChange} />,
    },
  ];
};