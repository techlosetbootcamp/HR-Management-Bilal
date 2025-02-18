// "use client";

// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { requestOtp, verifyOtp } from "../../../redux/slice/forgotPasswordSlice";
// import { RootState, AppDispatch } from "@/redux/store"; 

// export default function ForgotPasswordPage() {
//     const [email, setEmail] = useState("");
//     const [otp, setOtp] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [step, setStep] = useState(1);
//     const [error, setError] = useState("");

//     const dispatch = useDispatch<AppDispatch>();
//     const { loading, error: apiError } = useSelector((state: RootState) => state.forgotPassword);

//     const handleRequestOtp = async () => {
//         if (!email.includes("@")) {
//             setError("Please enter a valid email address.");
//             return;
//         }
    
//         dispatch(requestOtp(email))
//             .unwrap()
//             .then(() => setStep(2))
//             .catch((err) => setError(err.message || "Failed to send OTP"));
//     };
//     const handleVerifyOtp = () => {
//         setError("");

//         if (otp.length !== 6) {
//             setError("OTP must be 6 digits.");
//             return;
//         }

//         if (newPassword.length < 6) {
//             setError("Password must be at least 6 characters.");
//             return;
//         }

//         dispatch(verifyOtp({ email, otp, newPassword }))
//             .unwrap()
//             .then(() => setStep(3))
//             .catch((err) => setError(err.message || "Failed to reset password"));
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
//             <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
//                 <h2 className="text-xl font-bold text-center mb-4">
//                     {step === 1 ? "Forgot Password" : step === 2 ? "Verify OTP" : "Success"}
//                 </h2>

//                 {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
//                 {apiError && <p className="text-red-500 text-sm mb-3">{apiError}</p>}

//                 {step === 1 && (
//                     <>
//                         <input
//                             type="email"
//                             className="w-full px-3 py-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Enter Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             disabled={loading}
//                         />
//                         <button
//                             onClick={handleRequestOtp}
//                             disabled={loading}
//                             className={`w-full bg-blue-500 text-white py-2 rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
//                         >
//                             {loading ? "Sending..." : "Send OTP"}
//                         </button>
//                     </>
//                 )}

//                 {step === 2 && (
//                     <>
//                         <input
//                             type="text"
//                             className="w-full px-3 py-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Enter OTP"
//                             value={otp}
//                             onChange={(e) => setOtp(e.target.value)}
//                             disabled={loading}
//                         />
//                         <input
//                             type="password"
//                             className="w-full px-3 py-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="New Password"
//                             value={newPassword}
//                             onChange={(e) => setNewPassword(e.target.value)}
//                             disabled={loading}
//                         />
//                         <button
//                             onClick={handleVerifyOtp}
//                             disabled={loading}
//                             className={`w-full bg-green-500 text-white py-2 rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"}`}
//                         >
//                             {loading ? "Verifying..." : "Reset Password"}
//                         </button>
//                     </>
//                 )}

//                 {step === 3 && (
//                     <p className="text-green-600 text-center">Your password has been reset successfully! 🎉</p>
//                 )}
//             </div>
//         </div>
//     );
// }
// import ForgetPassForm from "@/components/forgetPassForm/ForgetPassForm";
// import { iconArrow } from "@/constants/Images";
// import Image from "next/image";
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
              <ChevronLeft size={24}/>
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
