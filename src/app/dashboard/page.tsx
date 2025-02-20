"use client";

import React, { useEffect, useState } from "react";
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
  const [localUser, setLocalUser] = useState(user);

  useEffect(() => {
    if (session?.user) {
      console.log("Session Data:", session);
      const newUser = {
        id: session.user.id ?? "",
        name: session.user.name ?? "",
        email: session.user.email ?? "",
      };
      dispatch(setUser(newUser));
      setLocalUser(newUser); // Update local state to trigger re-render
    } else {
      dispatch(logout());
      setLocalUser(null); // Update local state to trigger re-render
    }
  }, [session, dispatch]);

  useEffect(() => {
    console.log("User state after setting session:", user);
    setLocalUser(user); // Sync local state with Redux state
    if (!user?.id) {
      router.push("/login");
    }
  }, [user, router]);

  const handleLogout = async () => {
    await signOut();
    console.log("User logged out");
    dispatch(logout());
    setLocalUser(null); // Update local state to trigger re-render
    // router.push("/login");
  };

  return (
    <div>
      {localUser?.id ? (
        <>
          <h1>Welcome, {localUser.name}</h1>
          <p>User ID: {localUser.id}</p> {/* Display user ID */}
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

export default UserProfile;
