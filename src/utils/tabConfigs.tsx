import { User, Briefcase, FileText, Lock } from "lucide-react";
import React from "react";

interface TabItem {
  key: string;
  label: string;
  icon: React.ReactNode | null;
}

export const mainTabs: TabItem[] = [
  { key: "profile", label: "Profile", icon: null },
  { key: "attendance", label: "Attendance", icon: null },
  { key: "projects", label: "Projects", icon: null },
  { key: "leave", label: "Leave", icon: null },
];

export const subTabs: TabItem[] = [
  { key: "personal", label: "Personal Info", icon: <User /> },
  { key: "professional", label: "Professional Info", icon: <Briefcase /> },
  { key: "documents", label: "Documents Info", icon: <FileText /> },
  { key: "account", label: "Account Info", icon: <Lock /> },
];