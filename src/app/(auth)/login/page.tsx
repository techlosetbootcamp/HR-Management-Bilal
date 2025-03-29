import LoginForm from "@/components/loginForm/LoginForm";
import { HRLogo } from "@/constants/images";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-customBlack">
      <div className="w-[445px] h-[561px] gap-[40px]">
        <Image
          src={HRLogo}
          alt="Icon Logo"
          className="h-[166px] w-[409px] mb-5"
        />
        <h1 className="text-white font-[600] text-[30px] leading-[40px] mb-3">
          Welcome
        </h1>
        <p className="text-white font-light mb-5 text-[16px]">
          Please Login here
        </p>
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
