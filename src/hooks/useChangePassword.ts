// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../redux/store";
// import { changePassword, clearMessages } from "../redux/slice/authSlice";

// const useChangePassword = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { loading, error, successMessage } = useSelector((state: RootState) => state.auth);
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   const handleChangePassword = async () => {
//     if (!oldPassword || !newPassword) return;

//     await dispatch(changePassword({ oldPassword, newPassword }));

//     setOldPassword("");
//     setNewPassword("");
//   };

//   const resetMessages = () => {
//     dispatch(clearMessages());
//   };

//   return {
//     oldPassword,
//     setOldPassword,
//     newPassword,
//     setNewPassword,
//     handleChangePassword,
//     loading,
//     error,
//     successMessage,
//     resetMessages,
//   };
// };

// export default useChangePassword;
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const useChangePassword = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const otpData = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("otpData") || "{}") : {};

  useEffect(() => {
    if (!session?.user?.email && !otpData.email) {
      router.push("/login"); // Redirect to login if no user is authenticated or verified by OTP
    }
  }, [session, otpData, router]);

  const handleChangePassword = async (isAuthenticated: boolean) => {
    if (!newPassword || !confirmPassword) return;
    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match");
    }
  
    let email;
    if (!isAuthenticated) {
      email = localStorage.getItem("resetEmail"); // ✅ Retrieve email for unauthenticated users
      if (!email) {
        return setError("Email is required for password reset");
      }
    }
  
    try {
      const response = await fetch("/api/auth/changePassword", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isAuthenticated
            ? { oldPassword, newPassword }
            : { email, newPassword } // ✅ Pass email for unauthenticated users
        ),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Password change failed");
      }
  
      localStorage.removeItem("resetEmail"); // ✅ Clear stored email after successful password reset
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setError(error.message);
    }
  };
  
  

  return {
    session,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleChangePassword,
    loading,
    error,
  };
};

export default useChangePassword;
