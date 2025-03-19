import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchLeaves, updateLeaveStatus } from "@/redux/slice/leaveSlice";
import toast from "react-hot-toast";

export const useLeave = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const { data : session } = useSession();
  const { leaves, loading } = useSelector((state: RootState) => state.leave);

  const handleUpdateStatus = async (
    leaveId: string,
    status: "APPROVED" | "REJECTED"
  ) => {
    try {
      await dispatch(updateLeaveStatus({ leaveId, status })).unwrap();
      toast.success(`Leave ${status.toLowerCase()} successfully!`);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  useEffect(() => {
    dispatch(fetchLeaves());
  }, [dispatch]);

  return {
    leaves,
    loading,
    updateLeaveStatus: handleUpdateStatus,
  };
};
