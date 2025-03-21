"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchAttendance } from "@/redux/slice/attandanceSlice";

export const useAttendanceRecords = () => {
  const dispatch = useDispatch<AppDispatch>();
  const attendanceRecords = useSelector(
    (state: RootState) => state.attandance.attendanceRecords
  );
  const loading = useSelector((state: RootState) => state.attandance.loading);
  const error = useSelector((state: RootState) => state.attandance.error);

  useEffect(() => {
    dispatch(fetchAttendance());
  }, [dispatch]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }
  return { attendanceRecords, loading, error, formatDate };
};
