import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { changePassword, clearMessages } from "../redux/slice/authSlice";

const useChangePassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, successMessage } = useSelector((state: RootState) => state.auth);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) return;

    await dispatch(changePassword({ oldPassword, newPassword }));

    setOldPassword("");
    setNewPassword("");
  };

  const resetMessages = () => {
    dispatch(clearMessages());
  };

  return {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    handleChangePassword,
    loading,
    error,
    successMessage,
    resetMessages,
  };
};

export default useChangePassword;
