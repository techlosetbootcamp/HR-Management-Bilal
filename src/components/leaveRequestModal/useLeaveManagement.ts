import { useState, useEffect } from "react";
import { fetchLeaves, submitLeave } from "@/redux/slice/leaveSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";

export const useLeaveManagement = (employeeId: string) => {
  const dispatch = useAppDispatch();
  const { leaves, loading } = useAppSelector((state: RootState) => ({
    ...state.leave,
    leaves: state.leave.leaves.filter(
      (leave) => leave.employeeId === employeeId
    ),
  }));

  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (new Date(startDate) > new Date(endDate)) {
      alert("End date must be after the start date.");
      return;
    }

    try {
      await dispatch(
        submitLeave({ startDate, endDate, reason, employeeId })
      ).unwrap();
      alert("Leave requested successfully!");
      resetForm();
      dispatch(fetchLeaves());
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const resetForm = () => {
    setStartDate("");
    setEndDate("");
    setReason("");
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(fetchLeaves());
  }, [dispatch]);

  return {
    showModal,
    startDate,
    endDate,
    reason,
    loading,
    leaves,
    setShowModal,
    setStartDate,
    setEndDate,
    setReason,
    handleSubmit,
    resetForm,
  };
};
