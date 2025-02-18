"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";

export const useChangePassword = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Automatically open the modal when the page loads
  useEffect(() => {
    setIsOpen(true);
  }, []);

  // Function to close the modal and go back to the previous page
  const handleClose = () => {
    setIsOpen(false);
    router.back(); // Redirects to the previous page
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "newPassword") setNewPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.put("/api/changePassword", {
        email,
        newPassword,
      });

      if (res.status === 200) {
        toast.success("Password changed successfully!");
        localStorage.removeItem("otpData");
        router.push("/success");
      }
    } catch (error: any) {
      console.error("Error changing password:", error);
      toast.error(
        error?.response?.data?.message || "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
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
