import { fetchAttendance } from "@/redux/slice/attandanceSlice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/redux/store";

const useAttendance = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { attendanceRecords, loading, error } = useSelector(
    (state: RootState) => state.attandance
  );

  useEffect(() => {
    dispatch(fetchAttendance());
  }, [dispatch]);

  return { attendance: attendanceRecords, loading, error };
};

export default useAttendance;
