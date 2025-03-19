import { useState, useEffect } from "react";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  photoURL: string;
  designation: string;
  employmentType: string;
}

interface AttendanceRecord {
  id: number;
  employee: Employee;
  checkIn: string;
  status: string;
}

const useAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch("/api/attendance");
        if (!response.ok) {
          throw new Error("Failed to fetch attendance records");
        }
        const data = await response.json();
        setAttendanceRecords(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  return { attendanceRecords, loading, error };
};

export default useAttendance;