"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const useOtp = () => {
  const router = useRouter();
  const [otpInput, setOtpInput] = useState(""); // State for OTP input
  const [otp, setOtp] = useState({ email: "", otp: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setOtpInput(e.target.value); // Update OTP input state

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

      const matchOtp = otp.otp == otpInput; // Compare with OTP input state

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

  return { otpInput, handleChange, handleSubmit }; // Return OTP input state
};

export default useOtp;
