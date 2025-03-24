import { Employee } from "./types";

export interface LeaveRequest {
  id: string;
  employee: {
    firstName: string;
    lastName: string;
    email: string;
    photoURL?: string;
  };
  reason: string;
  startDate: string;
  endDate: string;
  status: string;
}

export interface LeaveRecordProps {
  leaves: LeaveRequest[];
  loading?: boolean;
  isAdmin?: boolean;
  showEmployeeDetails?: boolean;
  updateLeaveStatus?: (
    leaveId: string,
    status: "APPROVED" | "REJECTED"
  ) => Promise<void>;
}

export interface Leave {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  employee: Employee;
  employeeId: string;
}

export interface LeaveState {
  leaves: Leave[];
  loading: boolean;
  error: string | null;
}
