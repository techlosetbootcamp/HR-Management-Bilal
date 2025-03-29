"use client";
import { useEffect, useState } from "react";
import useOtp from "@/app/(auth)/otp/useOtp";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";
import InputField from "@/components/inputField/InputFeild";

const OtpPage = () => {
  const { otpInput, handleChange, handleSubmit } = useOtp();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    router.back();
  };

  return (
    isOpen && (
      <div className="h-screen flex items-center justify-center bg-black ">
        <div className="bg-customBlack p-6 rounded-lg w-[450px] text-white">
          <h2 className="text-xl font-semibold text-center mb-4">Verify OTP</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              name="otp"
              label="Enter OTP"
              type="text"
              value={otpInput}
              onChange={handleChange}
            />

            <Button type="submit">Verify OTP</Button>
          </form>

          <Button
            type="button"
            onClick={handleClose}
            className="bg-gray-500 hover:bg-gray-600 mt-4"
          >
            Close
          </Button>
        </div>
      </div>
    )
  );
};

export default OtpPage;
