"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {  useAppDispatch } from "@/redux/store";
import { deleteEmployee } from "@/redux/slice/employeeSlice";
import { Employee } from "@/types/empoyee";

export const useAllEmployee = (employees: Employee[]) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage, setEmployeesPerPage] = useState(6);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setEmployeesPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleViewEmployee = (id: string) => {
    router.push(`/employees/${id}`);
  };

  const handleEditEmployee = (id: string) => {
    router.push(`/employees/${id}?edit=true`);
  };

  const handleDeleteEmployee = (id: string) => {
    dispatch(deleteEmployee(id))
      .unwrap()
      .then(() => {
        console.log("Employee deleted successfully");
      })
      .catch((error) => {
        console.error("Failed to delete employee:", error);
      });
  };

  return {
    currentEmployees,
    currentPage,
    employeesPerPage,
    paginate,
    handleItemsPerPageChange,
    handleViewEmployee,
    handleEditEmployee,
    handleDeleteEmployee,
  };
};
