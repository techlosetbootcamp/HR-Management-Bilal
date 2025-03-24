"use client";
import { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchProjects } from "../../redux/slice/projectSlice";
import { fetchAttendance } from "../../redux/slice/attandanceSlice";
import { fetchLeaves } from "../../redux/slice/leaveSlice";
import { fetchEmployees } from "../../redux/slice/employeeSlice";

export const useAnalyticsData = () => {
  const dispatch = useAppDispatch();
  const projectCount = useAppSelector(
    (state: RootState) => state.projects.projects.length
  );
  const attendanceCount = useAppSelector(
    (state: RootState) => state.attandance.attendanceRecords.length
  );
  const leaveCount = useAppSelector(
    (state: RootState) => state.leave.leaves.length
  );
  const employeeCount = useAppSelector(
    (state: RootState) => state.employees.employees.length
  );

  const [updateDates, setUpdateDates] = useState({
    employees: "",
    leaves: "",
    attendance: "",
    projects: "",
  });
  const [loading, setLoading] = useState(true);

  const getTodayDate = () =>
    new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchEmployees());
        setUpdateDates((prev) => ({ ...prev, employees: getTodayDate() }));

        await dispatch(fetchLeaves());
        setUpdateDates((prev) => ({ ...prev, leaves: getTodayDate() }));

        await dispatch(fetchProjects());
        setUpdateDates((prev) => ({ ...prev, projects: getTodayDate() }));

        await dispatch(fetchAttendance());
        setUpdateDates((prev) => ({ ...prev, attendance: getTodayDate() }));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return {
    employeeCount,
    leaveCount,
    attendanceCount,
    projectCount,
    updateDates,
    loading,
  };
};
