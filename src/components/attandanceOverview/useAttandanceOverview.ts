"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  photoURL: string;
  designation: string;
  employmentType: string;
}

export interface AttendanceRecord {
  id: number;
  employee: Employee;
  checkIn: string;
  status: string;
}

export const useAttendanceRecords = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // This ref will ensure we only fetch data once.
  const fetchedRef = useRef<boolean>(false);

  useEffect(() => {
    if (fetchedRef.current) return; // Prevent fetching if already fetched

    const fetchAttendance = async () => {
      try {
        const response = await axios.get("/api/attendance");
        if (Array.isArray(response.data)) {
          // Limit to the latest 5 records
          setAttendanceRecords(response.data.slice(0, 5));
        } else {
          setError("Response data is not an array");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchedRef.current = true;
    fetchAttendance();
  }, []);

  return { attendanceRecords, loading, error };
};
