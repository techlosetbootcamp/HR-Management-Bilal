"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout, setUser } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";  
import AttandanceOverview from "../attandanceOverview/AttandanceOverview";
import AttendanceChart from "../attandanceChart/AttandanceChart";
import Analytics from "../analytics/Analytics";
const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user) {
      dispatch(
        setUser({
          id: session.user.id ?? "",
          name: session.user.name ?? "",
          email: session.user.email ?? "",
          role: session.user.role ?? "EMPLOYEE"
        })
      );
    } else {
      dispatch(logout());
      router.push("/login");
    }
  }, [session, status, dispatch, router]);

  const handleLogout = async () => {
    await signOut();
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div>
      {status === "loading" ? (
        <p>Loading session...</p>
      ) : user ? (
        <>
         <Analytics/>
         <AttendanceChart/>
       <AttandanceOverview/> 

          <h1>Welcome, {user.user?.name}</h1>
          <p>User ID: {user.user?.id}</p>
          <p>Role: {user.user?.role}</p>

          {user.user?.role === "ADMIN" ? (
            <div>
              <h2>Admin Panel</h2>
              <p>You have admin privileges.</p>
            </div>
          ) : (
            <div>
              <h2>Employee Dashboard</h2>
              <p>You are an employee.</p>
            </div>
          )}

          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Redirecting to login...</p>
      )}
      <div>
        <h1 className="text-white">Change Password</h1>
        <Link href="../changePassword" className="white">
          Click to Change password
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
