"use client";
import Image from "next/image";
import { Edit } from "lucide-react";
import EmployeeInput from "@/components/employeeInput/EmployeeInput";
import { useProfile } from "@/app/(root)/profile/useProfile";
import LottieAnimation from "@/components/lottieAnimation/LottieAnimation";

export default function Page() {
  const {
    name,
    setName,
    email,
    setEmail,
    previewImage,
    loading,
    isSessionLoading,
    handleFileChange,
    handleSubmit,
  } = useProfile();

  if (isSessionLoading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-[#131313]">
        <LottieAnimation />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 dark:bg-[#29272761] bg-gray-100 rounded-xl shadow-xl animate-glow">
      <div className="flex items-center justify-center mb-6">
        <h2 className="text-3xl font-bold dark:text-white">Welcome: {name}</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative w-36 h-36 mx-auto mb-4">
          <Image
            src={previewImage}
            width={100}
            height={100}
            alt="Profile Picture"
            className="w-36 h-36 rounded-full border-4 border-customOrange object-cover"
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="fileInput"
            onChange={handleFileChange}
          />

          <label
            htmlFor="fileInput"
            className="absolute bottom-0 right-0 bg-customOrange p-2 rounded-full cursor-pointer"
          >
            <Edit className="w-5 h-5 text-white" />
          </label>
        </div>
        <div>
          <EmployeeInput
            label="Name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border-2 rounded-xl border-customOrange dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <EmployeeInput
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border-2 cursor-not-allowed bg-gray-700 border-customOrange rounded-xl text-gray-400"
            disabled
          />
        </div>

        <button
          type="submit"
          className="w-full h-[56px] rounded-xl bg-customOrange border border-customOrange dark:hover:bg-[#131313] hover:bg-gray-200 p-2 hover:text-customOrange transition-all ease-in-out duration-300"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
