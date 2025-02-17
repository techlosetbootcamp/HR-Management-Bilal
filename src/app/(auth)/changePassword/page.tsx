// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import useChangePassword from "@/hooks/useChangePassword";

// const ChangePasswordForm = () => {
//   const {
//     oldPassword,
//     setOldPassword,
//     newPassword,
//     setNewPassword,
//     handleChangePassword,
//     loading,
//     error,
//     successMessage,
//     resetMessages,
//   } = useChangePassword();

//   const router = useRouter();

//   // Redirect to dashboard after successful password change
//   useEffect(() => {
//     if (successMessage) {
//       setTimeout(() => {
//         router.push("/dashboard");
//       }, 1500); // Slight delay for UX
//     }
//   }, [successMessage, router]);

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold text-center mb-4">Change Password</h2>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleChangePassword();
//         }}
//         className="space-y-4"
//       >
//         <input
//           type="password"
//           placeholder="Old Password"
//           className="w-full p-2 border border-gray-300 rounded"
//           value={oldPassword}
//           onChange={(e) => setOldPassword(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="New Password"
//           className="w-full p-2 border border-gray-300 rounded"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
//           disabled={loading}
//         >
//           {loading ? "Changing..." : "Change Password"}
//         </button>
//       </form>
//       {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
//       {successMessage && <p className="text-green-500 mt-2 text-center">{successMessage}</p>}
//       {(error || successMessage) && (
//         <button
//           className="mt-2 text-sm text-gray-500 underline"
//           onClick={resetMessages}
//         >
//           Dismiss
//         </button>
//       )}
//     </div>
//   );
// };

// export default ChangePasswordForm;

//////

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import toast from "react-hot-toast";
// import axios from "axios";

// const ChangePasswordForm = () => {
//   const { data: session, status } = useSession(); // Check authentication status
//   const router = useRouter();
//   const isAuthenticated = status === "authenticated";

//   const [currentPassword, setCurrentPassword] = useState(""); // Only for logged-in users
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   useEffect(() => {
//     if (!isAuthenticated) {
//       const otpData = localStorage.getItem("otpData");
//       if (!otpData) {
//         toast.error("OTP verification required.");
//         router.push("/forgot-password");
//       }
//     }
//   }, [isAuthenticated, router]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!newPassword || !confirmPassword) {
//       toast.error("Please fill in all fields.");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       toast.error("Passwords do not match.");
//       return;
//     }

//     try {
//       if (isAuthenticated) {
//         await axios.put("/api/auth/changePassword", {
//           email: session?.user?.email,
//           currentPassword,
//           newPassword,
//         });
//       } else {
//         const otpData = JSON.parse(localStorage.getItem("otpData") || "{}");
//         await axios.put("/api/forgotPassword", {
//           email: otpData.email,
//           newPassword,
//         });
//         localStorage.removeItem("otpData");
//       }

//       toast.success("Password changed successfully!");
//       router.push("/login");
//     } catch (error: any) {
//       console.error("Error:", error);
//       toast.error(error.response?.data?.error || "Something went wrong.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold text-center mb-4">
//         {isAuthenticated ? "Change Password" : "Reset Password"}
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {isAuthenticated && (
//           <input
//             type="password"
//             placeholder="Current Password"
//             className="w-full p-2 border border-gray-300 rounded"
//             value={currentPassword}
//             onChange={(e) => setCurrentPassword(e.target.value)}
//             required
//           />
//         )}
//         <input
//           type="password"
//           placeholder="New Password"
//           className="w-full p-2 border border-gray-300 rounded"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           className="w-full p-2 border border-gray-300 rounded"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
//         >
//           {isAuthenticated ? "Change Password" : "Reset Password"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChangePasswordForm;
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ChangePasswordForm = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // Extract email from URL
  const router = useRouter();

  console.log("Extracted email from URL:", email); // Debugging log

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      toast.error("Email is required to reset password!");
      console.log("No email found in URL. Redirecting...");
      setTimeout(() => {
        router.push("/forgot-password");
      }, 2000);
    }
  }, [email, router]);

  const handleChangePassword = async () => {
    if (!email) {
      toast.error("Email is missing!");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      console.log("Passwords did not match.");
      return;
    }

    setLoading(true);
    console.log("Sending password reset request for:", email);

    try {
      const res = await fetch("/api/auth/changePassword", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ Ensures session is preserved
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();
      console.log("Server response:", data);

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast.success("Password changed successfully!");
      router.push("/login"); // Redirect to login
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error changing password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Reset Password</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleChangePassword();
        }}
        className="space-y-4"
      >
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 border border-gray-300 rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 border border-gray-300 rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
