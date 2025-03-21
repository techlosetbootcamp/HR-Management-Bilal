// hooks/useProjectsRecord.ts
"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchEmployeeProjects,
  completeProject,
} from "@/redux/slice/projectSlice";

export const formatDate = (dateString: string | null) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

export const calculateDuration = (start: string | null, end: string | null) => {
  if (!start || !end) return "N/A";
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diff = endDate.getTime() - startDate.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24)) + " Days";
};

export function useProjectsRecord(employeeId: string) {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, loading, error } = useSelector(
    (state: RootState) => state.projects
  );

  useEffect(() => {
    if (employeeId) {
      dispatch(fetchEmployeeProjects(employeeId));
    }
  }, [dispatch, employeeId]);

  const handleComplete = (projectId: string) => {
    dispatch(completeProject(projectId));
  };

  return {
    projects,
    loading,
    error,
    handleComplete,
    formatDate,
    calculateDuration,
  };
}
