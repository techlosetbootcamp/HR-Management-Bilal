import LoginForm from "@/components/loginForm/LoginForm";
import { iconLoginLogo } from "@/constants/images";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#131313]">
      <div className="w-[445px] h-[561px] gap-[40px]">
        <Image
          src={iconLoginLogo}
          alt="Icon Logo"
          className="h-[166px] w-[409px] mb-5"
        />
        <div className="text-white font-[600] text-[30px] leading-[40px] mb-3">
          Welcome
        </div>
        <div className="text-white font-light mb-5 text-[16px]">
          Please Login here
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
