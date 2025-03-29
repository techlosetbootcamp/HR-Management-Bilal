"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Button from "@/components/button/Button";

const SuccessPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleNavigation = () => {
    if (session) {
      router.push("/");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-customBlack">
      <div className=" flex flex-col justify-center items-center text-white rounded-[10px] p-[30px]">
        <h1 className="text-[30px] font-[600]">Password updated</h1>
        <h2 className="text-[30px] font-[600]">Successfully</h2>
        <p className="font-light text-[16px] text-gray-400 mt-[5px]">
          Your password has been update successfully
        </p>
        <Button onClick={handleNavigation} className="mt-6">
          {session ? "Go to Dashboard" : "Login Now"}
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
