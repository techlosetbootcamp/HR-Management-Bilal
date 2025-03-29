"use client";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import React from "react";
import Button from "@/components/button/Button";
import useForgetPassForm from "./useForgetPassword";
import InputField from "@/components/inputField/InputFeild";

const Page = () => {
  const { email, sendOTP, handleChange, loading } = useForgetPassForm();

  return (
    <>
      <div className=" flex items-center justify-center bg-customBlack h-screen w-full">
        <div className="w-[445px]">
          <div className="py-5">
            <Link className="text-white flex " href="/login">
              <ChevronLeft size={24} />
              <span className="text-[16px] ml-1">Back</span>
            </Link>
          </div>
          <h1 className="text-white font-[600] text-[30px]">Forgot Password</h1>
          <p className="text-white font-[300] text-[16px] mb-5">
            Enter your Registered Email Address. we’ll send you a code to reset
            your password.
          </p>
          <div className="flex flex-col items-center max-w-[445px] ">
            <InputField
              name={"email"}
              value={email}
              onChange={handleChange}
              type="email"
              label="Email"
            />
            <Button type="submit" onClick={sendOTP}>
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
