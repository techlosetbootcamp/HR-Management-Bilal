"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Button from "@/components/button/Button";

const SuccessPage = () => {
  const router = useRouter();
  const { data: session } = useSession(); // Get authentication status

  const handleNavigation = () => {
    if (session) {
      router.push("/dashboard"); // Redirect to Dashboard if authenticated
    } else {
      router.push("/login"); // Redirect to Login if not authenticated
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#131313]">
      <div className=" flex flex-col justify-center items-center text-white rounded-[10px] p-[30px]">
        <div className="text-[30px] font-[600] ">Password updated</div>
        <div className="text-[30px] font-[600]  ">Successfully</div>
        <div className="font-light text-[16px] text-gray-400 mt-[5px]">
          Your password has been update successfully
        </div>
        <Button onClick={handleNavigation} className="mt-6">
          {session ? "Go to Dashboard" : "Login Now"}
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
