"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout, setUser } from "@/redux/slice/authSlice"; 
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
const UserProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (session?.user) {
      dispatch(setUser({ name: session.user.name ?? "", email: session.user.email ?? "" }));
    }
  }, [session, dispatch]);

  useEffect(() => {
    console.log("User state:", user); 
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleLogout = async () => {
    await signOut({ redirect: false }); 
    dispatch(logout()); 
    router.push("/login");
  };

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user.name}</h1>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Redirecting to login...</p>
      )}
      <div>
        <h1 className='text-white'>Change Password</h1>
        <Link href='../changePassword' className='white'>Click to Change password</Link>
      </div>
    </div>
  );
};

export default UserProfile;
