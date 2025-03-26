"use client";
import { useState, useEffect } from "react";
import {
  fetchEmployees,
  submitAttendance,
} from "@/redux/slice/attandanceSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useSession } from "next-auth/react";
import { Employee } from "@/types/attandance";

export function useMarkAttandance() {
  const dispatch = useAppDispatch();
  const employees = useAppSelector(
    (state: RootState) => state.attandance.employees
  );
  const loading = useAppSelector(
    (state: RootState) => state.attandance.loading
  );
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [date, setDate] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [breakTime, setBreakTime] = useState("");
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [manualWorkingHours, setManualWorkingHours] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const filteredEmployees = employees.filter(
    (emp) =>
      emp?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp?.employeeId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee || !status || !date) {
      alert("Employee, date, and status are required!");
      return;
    }

    const payload = {
      employeeId: selectedEmployee.id,
      date: new Date(date).toISOString(),
      checkIn: checkIn ? new Date(`${date}T${checkIn}:00`).toISOString() : null,
      checkOut: checkOut
        ? new Date(`${date}T${checkOut}:00`).toISOString()
        : null,
      breakTime: breakTime || null,
      workingHours: manualWorkingHours || "0:00",
      status,
    };

    try {
      await dispatch(submitAttendance(payload)).unwrap();
      alert("Attendance recorded successfully!");
      resetForm();
    } catch {
      alert("Something went wrong");
    }
  };

  const resetForm = () => {
    setSelectedEmployee(null);
    setDate("");
    setCheckIn("");
    setCheckOut("");
    setBreakTime("");
    setStatus("");
    setShowModal(false);
  };

  return {
    employees: filteredEmployees,
    selectedEmployee,
    setSelectedEmployee,
    date,
    setDate,
    checkIn,
    isAdmin,
    setCheckIn,
    checkOut,
    setCheckOut,
    breakTime,
    setBreakTime,
    status,
    setStatus,
    loading,
    showModal,
    setShowModal,
    manualWorkingHours,
    setManualWorkingHours,
    handleSubmit,
    resetForm,
    searchTerm,
    handleSearchChange,
  };
}
