import { Employee } from "./types";

export interface Project {
  id: string;
  title: string;
  description?: string;
  status: string;
  startDate: string;
  endDate: string;
  assignedEmployeeId: string;
}
export interface ProjectsState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}
export interface ProjectListProps {
  projects: Project[];
  employees: Employee[];
  loading?: boolean;
  error?: string;
  onCompleteProject?: (projectId: string) => void;
  showEmployeeName?: boolean;
  showActionButton?: boolean;
}

export interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  setTitle: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  startDate: string;
  setStartDate: (val: string) => void;
  endDate: string;
  setEndDate: (val: string) => void;
  employeeId: string;
  setEmployeeId: (val: string) => void;
  employees: { id: string; firstName: string; lastName: string }[];
  handleSubmit: (e: React.FormEvent) => void;
}
