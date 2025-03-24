"use client";

import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { setUser, logout } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";

export function useAuth(redirect = false) {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (session?.user) {
      const newUser = {
        id: session.user.id ?? "",
        name: session.user.name ?? "",
        email: session.user.email ?? "",
        role: session.user.role ?? "",
      };
      dispatch(setUser(newUser));
      if (redirect) router.push("/");
    } else {
      dispatch(logout());
    }
  }, [session, dispatch, redirect, router]);

  return { user, signOut };
}
