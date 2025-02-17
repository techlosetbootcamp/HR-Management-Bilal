import { useRouter } from "next/navigation";
import { useState, useEffect, ChangeEvent } from "react";
import toast from "react-hot-toast";

const useOtp = () => {
  const router = useRouter();
  const [state, setState] = useState({ otp: "" });
  const [otpData, setOtpData] = useState<{ email: string; otp: string } | null>(null);

  useEffect(() => {
    const storedOtp = localStorage.getItem("otpData");
    console.log("Stored OTP from localStorage:", storedOtp); // Debug log

    if (storedOtp) {
      setOtpData(JSON.parse(storedOtp));
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Entered OTP:", state.otp);
    console.log("Stored OTP:", otpData?.otp);
  
    if (!otpData) {
      toast.error("OTP Expired or Not Found");
      console.log("No OTP data found in localStorage.");
      return;
    }
  
    // Ensure both values are strings before comparing
    if (state.otp.trim() !== String(otpData.otp).trim()) {
      toast.error("Invalid OTP");
      console.log("Entered OTP does not match stored OTP.");
      return;
    }
  
    toast.success("OTP Verified Successfully!");
    console.log("OTP Matched! Navigating to changePassword page...");
  
    localStorage.removeItem("otpData"); // Remove OTP after successful verification
  
    setTimeout(() => {
      router.push(`/changePassword?email=${otpData.email}`);
    }, 1000);
  };
  
  

  return { otpInput: state.otp, handleChange, handleSubmit };
};

export default useOtp;


