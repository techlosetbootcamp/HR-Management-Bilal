"use client";
import { useEffect, useState } from "react";
import {  RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchEmployees } from "@/redux/slice/employeeSlice";
import { useSession } from "next-auth/react";

export const useEmployee = () => {
  const dispatch = useAppDispatch();

  const { employees, loading, error, filters } = useAppSelector(
    (state: RootState) => state.employees
  );
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const filteredEmployees = employees.filter((emp) => {
    return (
      (!filters.department || emp.department === filters.department) &&
      (!filters.designation || emp.designation === filters.designation) &&
      (!filters.city || emp.city === filters.city) &&
      (searchTerm === "" ||
        emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return {
    loading,
    error,
    filteredEmployees,
    isAdmin,
    searchTerm,
    showFilter,
    setShowFilter,
    handleSearchChange,
  };
};
