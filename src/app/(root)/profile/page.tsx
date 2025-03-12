"use client";
import Image from "next/image";
import { Edit } from "lucide-react";
import EmployeeInput from "@/components/employeeInput/EmployeeInput";
import { useProfile } from "@/hooks/useProfile";
import LottieAnimation from "@/components/lottieAnimation/LottieAnimation";

export default function ProfilePage() {
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
      <div className="flex justify-center items-center h-screen bg-[#131313]">
        <LottieAnimation />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-black rounded-lg shadow-md">
      <div className="flex items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Welcome: {name}</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 bg-black">
        <div className="relative w-36 h-36 mx-auto">
          <Image
            src={previewImage}
            width={100}
            height={100}
            alt="Profile Picture"
            className="w-36 h-36 rounded-full border border-gray-300 object-cover"
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
            className="absolute bottom-0 right-0 bg-black p-1 rounded-full cursor-pointer"
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
            className="w-full p-2 border rounded-xl border-gray-700"
          />
        </div>

        <div>
          <EmployeeInput
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border cursor-not-allowed bg-gray-600 border-gray-700 rounded-xl"
            disabled
          />
        </div>

        <button
          type="submit"
          className="w-full h-[56px] rounded-xl bg-customOrange border border-customOrange hover:bg-[#131313] text-white p-2 hover:text-customOrange transition-all ease-in-out duration-300"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
