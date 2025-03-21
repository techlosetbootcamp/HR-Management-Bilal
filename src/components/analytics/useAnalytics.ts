"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchProjects } from "../../redux/slice/projectSlice";
import { fetchAttendance } from "../../redux/slice/attandanceSlice";
import { fetchLeaves } from "../../redux/slice/leaveSlice";
import { fetchEmployees } from "../../redux/slice/employeeSlice";

export const useAnalyticsData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const projectCount = useSelector(
    (state: RootState) => state.projects.projects.length
  );
  const attendanceCount = useSelector(
    (state: RootState) => state.attandance.attendanceRecords.length
  );
  const leaveCount = useSelector(
    (state: RootState) => state.leave.leaves.length
  );
  const employeeCount = useSelector(
    (state: RootState) => state.employees.employees.length
  );

  const [updateDates, setUpdateDates] = useState({
    employees: "",
    leaves: "",
    attendance: "",
    projects: "",
  });

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
  };
};
