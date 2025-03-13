import { useEffect, useState } from "react";

export const useAttendance = (employeeId: string) => {
    const [attendance, setAttendance] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchAttendance = async () => {
        try {
          // Replace with your API call
          const response = await fetch(`/api/attendance?employeeId=${employeeId}`);
          const data = await response.json();
          setAttendance(data);
        } catch (error) {
          console.error("Error fetching attendance", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchAttendance();
    }, [employeeId]);
  
    return { attendance, loading };
  };
  