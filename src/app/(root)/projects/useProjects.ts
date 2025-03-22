// hooks/useProjects.ts
"use client";
import { useState, useEffect, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchProjects, addProject } from "@/redux/slice/projectSlice";
import { fetchEmployees } from "@/redux/slice/employeeSlice";

export function useProjects() {
  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const projectLoading = useSelector(
    (state: RootState) => state.projects.loading
  );
  const projectError = useSelector((state: RootState) => state.projects.error);

  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      addProject({
        title,
        description,
        assignedEmployeeId: employeeId,
        startDate,
        endDate,
      })
    );
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setEmployeeId("");
  };

  // Sort projects by startDate (newest first)
  const sortedProjects = [...projects].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  return {
    projects: sortedProjects,
    projectLoading,
    projectError,
    employees,
    title,
    setTitle,
    description,
    setDescription,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    employeeId,
    setEmployeeId,
    handleSubmit,
  };
}
