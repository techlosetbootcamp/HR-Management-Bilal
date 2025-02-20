"use client"

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout, setUser } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    console.log("Session from NextAuth:", session);
    console.log("Redux State User:", user);

    if (status === "loading") return;

    if (session?.user) {
      dispatch(
        setUser({
          id: session.user.id ?? "",
          name: session.user.name ?? "",
          email: session.user.email ?? "",
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
      ) : user?.id ? (
        <>
          <h1>Welcome, {user.name}</h1>
          <p>User ID: {user.id}</p>
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