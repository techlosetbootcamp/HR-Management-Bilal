"use client";
import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import {  RootState, useAppDispatch } from "../../redux/store";
import { fetchAttendance } from "../../redux/slice/attandanceSlice";
import { AttendanceData } from "@/types/attandance";

export const useAttandanceChart = () => {
  const dispatch = useAppDispatch();
  const attendanceRecords = useSelector(
    (state: RootState) => state.attandance.attendanceRecords
  );
  const [data, setData] = useState<AttendanceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        await dispatch(fetchAttendance());
      } catch (err) {
        console.error("Error fetching attendance data:", err);
        setError("Error fetching attendance data");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [dispatch]);

  useEffect(() => {
    const groupedData: { [key: string]: AttendanceData } = {};

    attendanceRecords.forEach((record: { date: string; status: string }) => {
      const day = new Date(record.date).toLocaleDateString("en-US", {
        weekday: "short",
      });

      if (!groupedData[day]) {
        groupedData[day] = { day, onTime: 0, late: 0, absent: 0 };
      }

      if (record.status === "ON_TIME") groupedData[day].onTime++;
      if (record.status === "LATE") groupedData[day].late++;
      if (record.status === "ABSENT") groupedData[day].absent++;
    });

    setData(Object.values(groupedData));
  }, [attendanceRecords]);

  return { data, loading, error };
};
