"use client"; 

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut, useSession } from "next-auth/react";
import { RootState } from "@/redux/store";
import { setUser, logout } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";

export function useAuth(redirect = false) {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (session?.user) {
      dispatch(setUser({ name: session.user.name ?? "", email: session.user.email ?? "" }));
      if (redirect) router.push("/dashboard");
    } else {
      dispatch(logout());
    }
  }, [session]);

  return { user, signOut };
}
