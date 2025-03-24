"use client";
import { useState, useEffect, FormEvent } from "react";
import {  RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchProjects, addProject } from "@/redux/slice/projectSlice";
import { fetchEmployees } from "@/redux/slice/employeeSlice";
import toast from "react-hot-toast";

export function useProjects() {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state: RootState) => state.projects.projects);
  const projectLoading = useAppSelector(
    (state: RootState) => state.projects.loading
  );
  const projectError = useAppSelector((state: RootState) => state.projects.error);

  const employees = useAppSelector(
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
    toast.success("Project added successfully!");
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setEmployeeId("");
  };

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
