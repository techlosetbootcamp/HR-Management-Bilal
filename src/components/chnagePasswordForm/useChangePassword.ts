"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { changePassword, clearMessages } from "@/redux/slice/authSlice";

export const useChangePassword = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { loading, error, successMessage } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setIsOpen(true);
    dispatch(clearMessages());
  }, [dispatch]);

  const handleClose = () => {
    setIsOpen(false);
    router.back();
  };

  useEffect(() => {
    const otpData = localStorage.getItem("otpData");
    if (otpData) {
      try {
        const { email } = JSON.parse(otpData);
        setEmail(email);
      } catch (error) {
        console.error("Error parsing OTP data:", error);
      }
    } else if (session?.user?.email) {
      setEmail(session.user.email);
    } else {
      toast.error("Session expired! Please log in again.");
      router.push("/login");
    }
  }, [session, router]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      localStorage.removeItem("otpData");
      router.push("/success");
      dispatch(clearMessages());
    }
    if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }
  }, [successMessage, error, dispatch, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "newPassword") setNewPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    dispatch(changePassword({ email, newPassword }));
  };

  return {
    handleSubmit,
    handleChange,
    newPassword,
    confirmPassword,
    loading,
    isOpen,
    handleClose,
  };
};
