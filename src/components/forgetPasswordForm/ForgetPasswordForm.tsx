"use client";

import useForgetPassForm from "@/components/forgetPasswordForm/useForgetPassword";
import React from "react";
import InputField from "../inputField/InputFeild";
import Button from "../button/Button";

export default function ForgetPassForm() {
  const { email, sendOTP, handleChange,loading } = useForgetPassForm();
  return (
    <div className="flex flex-col items-center max-w-[445px] ">
      <InputField
        name={"email"}
        value={email}
        onChange={handleChange}
        type="email"
        label="Email"
      />
      <Button
        type="submit"
        onClick={sendOTP}      >
        Send OTP
        {loading ? "Sending..." : "Send OTP"}
      </Button>
    </div>
  );
}
