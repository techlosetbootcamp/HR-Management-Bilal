import { useEffect } from "react";
import { RootState,  useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchLeaves, updateLeaveStatus } from "@/redux/slice/leaveSlice";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export const useLeave = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const isAdmin = session?.user.role === "ADMIN";
  const { leaves, loading } = useAppSelector((state: RootState) => state.leave);

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
    isAdmin,
    leaves,
    loading,
    updateLeaveStatus: handleUpdateStatus,
  };
};
