"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const useOtp = () => {
  const router = useRouter();
  const [state, setState] = useState({ otp: "" });
  const [otp, setOtp] = useState({ email: "", otp: "" });
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  useEffect(() => {
    const otpValue = localStorage.getItem("otpData");

    if (otpValue !== null) {
      const parsedOtp = JSON.parse(otpValue);
      if (parsedOtp) {
        setOtp(parsedOtp);
      }
    }
  }, []);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (!otp.otp || otp.otp == "") {
        toast.error("OTP Expired");
        return;
      }

      const matchOtp = otp.otp == state.otp;

      if (!matchOtp) {
        toast.error("OTP not matched");
        return;
      }
      router.push("/changePassword");
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  useEffect(() => {
    setTimeout(function () {
      localStorage.removeItem("otpData");
    }, 60 * 1000);
  }, []);
  return { handleChange, handleSubmit };
};

export default useOtp;
