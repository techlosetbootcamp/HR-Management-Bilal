'use client'
import { signOut } from "next-auth/react";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
const useForgetPassForm = () => {
  const [state, setState] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    signOut({
      redirect: false,
    });
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState((s) => ({ ...s, [event.target.name]: event.target.value }));
  };
  const otp = Math.floor(100000 + Math.random() * 900000);
  const sendOTP = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const data = {
      service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_ID,
      template_params: {
        to_email: state.email,
        to_name: state.email,
        from_name: "HR Management",
        user_email: state.email,
        otp_code: otp,
      },
    };

    try {
      const res = await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        data
      );
      console.log("res from email js", res.data);
      localStorage.setItem(
        "otpData",
        JSON.stringify({ email: state.email, otp })
      );
      toast.success("OTP sent Successfully!");
      router.push("/otp");
    } catch (error) {
      toast.error("Something went wrong!");
      console.log("error", error);
    }
  };
  useEffect(() => {
    setTimeout(function () {
      localStorage.removeItem("otpData");
    }, 2 * 60 * 1000);
  }, [otp]);

  return { loading, state, handleChange, sendOTP };
};

export default useForgetPassForm;
