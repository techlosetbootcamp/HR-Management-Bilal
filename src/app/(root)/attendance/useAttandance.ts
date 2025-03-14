import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  fetchEmployees,
  resetAttendanceState,
  setAttendanceState,
  submitAttendance,
} from "@/redux/slice/attandanceSlice";
import { useSession } from "next-auth/react";
export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  department: string;
  designation: string;
  employmentType: string;
  city?: string;
  photoURL?: string;
}

export interface AttendanceFormState {
  selectedEmployee: Employee | null;
  showModal: boolean;
  date: string;
  checkIn: string;
  checkOut: string;
  breakTime: string;
  manualWorkingHours: string;
  status: string;
  loading: boolean;
}

export default function useAttendance() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const { employees, attendanceState, loading, error } = useSelector(
    (state: RootState) => state.attandance
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);
  const filteredEmployees = Array.isArray(employees)
    ? employees.filter(
        (emp) =>
          searchTerm === "" ||
          emp.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.employeeId?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleMarkAttendance = (employee: Employee) => {
    dispatch(
      setAttendanceState({ selectedEmployee: employee, showModal: true })
    );
  };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (attendanceState.selectedEmployee || !attendanceState.date || attendanceState.status) {
    alert("Employee, date, and status are required!");
    return;
  }
  
  dispatch(submitAttendance());
};

  const updateAttendanceState = <K extends keyof AttendanceFormState>(
    field: K,
    value: AttendanceFormState[K]
  ) => {
    dispatch(setAttendanceState({ [field]: value }));
  };

  return {
    employees: filteredEmployees,
    attendanceState,
    loading,
    error,
    handleMarkAttendance,
    isAdmin,
    handleSubmit,
    searchTerm,
    handleSearchChange,
    updateAttendanceState,
    resetForm: () => dispatch(resetAttendanceState()),
  };
}
