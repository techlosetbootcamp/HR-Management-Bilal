"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { iconLoginLogo } from "@/constants/images";
import AttandanceOverview from "@/components/attandanceOverview/AttandanceOverview";
import Analytics from "../analytics/Analytics";
import AttendanceChart from "../attandanceChart/AttandanceChart";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (session?.user.role === "ADMIN") {
    return (
      <div className="p-6">
        <div className="border border-gray-300 dark:border-gray-700 rounded-xl p-3">
          <Analytics />
        </div>
        <div className="border border-gray-300 dark:border-gray-700 rounded-xl p-3 my-10">
          <AttendanceChart />
        </div>
        <div className="border border-gray-300 dark:border-gray-700 rounded-xl p-3">
          <AttandanceOverview showViewAll={true} showPagination={false} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#131313] animate-glow p-6">
        <div className="rounded-full shadow-xl">
          <Image src={iconLoginLogo} alt="Logo" width={250} height={250} />
        </div>
        <h1 className="mt-6 text-4xl font-extrabold text-white">
          Welcome, {session?.user.name}!
        </h1>
        <p className="mt-2 text-lg text-gray-300 text-center max-w-md">
          Enjoy your personalized dashboard. Check your profile for the latest
          updates.
        </p>
        <Link href="/profile">
          <p className="mt-6 px-6 py-3 bg-customOrange text-white font-semibold rounded-xl shadow-lg hover:bg-[#131313] hover:text-customOrange transition-all duration-300 border border-customOrange">
            Go to Profile
          </p>
        </Link>
        <div className="mt-10">
          <p className="text-gray-400 text-sm">
            This Application is Build By Developer Bilal.
          </p>
        </div>
      </div>
      {/* Removed the keyframe animation style block */}
    </>
  );
}
