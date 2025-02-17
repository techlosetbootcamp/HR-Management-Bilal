"use client";

import useForgetPassForm from "@/hooks/useForgetPassword";
import React from "react";

export default function ForgetPassForm() {
  const { email, sendOTP, handleChange } = useForgetPassForm();
  return (
    <div className="flex flex-col items-center max-w-[445px] ">
      <input
        name={"email"}
        value={email}
        onChange={handleChange}
      />
      <button
        type="submit"
        onClick={sendOTP}
        className="px-10 py-3 bg-customOrange w-full rounded-[10px] mt-5 text-center text-white disabled:opacity-70 cursor-pointer"
      >
        Send OTP
      </button>
    </div>
  );
}
