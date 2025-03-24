import ForgetPassForm from "@/components/forgetPasswordForm/ForgetPasswordForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import React from "react";

const Page = () => {
  return (
    <>
      <div className=" flex items-center justify-center bg-[#131313] h-screen w-full">
        <div className="w-[445px]">
          <div className="py-5">
            <Link className="text-white flex " href={"/login"}>
              <ChevronLeft size={24} />
              <span className="text-[16px] ml-1">Back</span>
            </Link>
          </div>
          <div className="text-white font-[600] text-[30px]">
            Forgot Password
          </div>
          <div className="text-white font-[300] text-[16px] mb-5">
            Enter your registered email address. we’ll send you a code to reset
            your password.
          </div>
          <ForgetPassForm />
        </div>
      </div>
    </>
  );
};

export default Page;
