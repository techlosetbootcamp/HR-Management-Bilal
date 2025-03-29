"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const useForgetPassForm = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000);
  const sendOTP = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!email) {
      toast.error("Please enter your email!");
      setLoading(false);
      return;
    }

    const otp = generateOTP();
    const otpExpiry = Date.now() + 2 * 60 * 1000;

    const data = {
      service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_ID,
      template_params: {
        to_email: email,
        to_name: email.split("@")[0],
        otp_code: otp,
      },
    };

    try {
      const res = await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        data
      );

      if (res.status === 200) {
        console.log("EmailJS response:", res.data);
        localStorage.setItem(
          "otpData",
          JSON.stringify({ email, otp, otpExpiry })
        );
        toast.success(`OTP sent to ${email} successfully!`);
        router.push("/otp");
      } else {
        throw new Error("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkOtpExpiry = () => {
      const storedOtp = localStorage.getItem("otpData");
      if (storedOtp) {
        const { otpExpiry } = JSON.parse(storedOtp);
        if (Date.now() > otpExpiry) {
          localStorage.removeItem("otpData");
          console.log("OTP expired and removed.");
        }
      }
    };

    const interval = setInterval(checkOtpExpiry, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { email, handleChange, sendOTP, loading };
};

export default useForgetPassForm;
