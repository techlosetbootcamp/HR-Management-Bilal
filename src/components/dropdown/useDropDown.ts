import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Profile } from "@/constants/images";
import { useRouter } from "next/navigation";
import { getProfileByEmail, getEmployeeByEmail } from "@/redux/slice/authSlice";
import {  RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import toast from "react-hot-toast";

export const useDropDown = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user, loading } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!session?.user?.email) return;

    dispatch(getProfileByEmail(session.user.email));
  }, [session, dispatch]);

  const handleProfileClick = () => {
    if (!session?.user?.email) {
      console.error("❌ No user email found in session!");
      alert("User email not found");
      return;
    }
    router.push(`/profile`);
  };

  const handleAboutClick = async () => {
    if (!session?.user?.email) {
      console.error("❌ No user email found in session!");
      alert("User email not found");
      return;
    }

    try {
      const resultAction = await dispatch(
        getEmployeeByEmail(session.user.email)
      );
      if (getEmployeeByEmail.fulfilled.match(resultAction)) {
        const employee = resultAction.payload;
        router.push(`/employees/${employee.id}`);
      } else {
        throw new Error("Employee not found");
      }
    } catch (error) {
      console.error("❌ Error fetching employee details:", error);
      toast.error("Your Are Not The Part of this organization");
    }
  };
  const handleChangePasswordClick = () => {
    router.push("/changePassword");
  };
  const userData = user
    ? {
        name: user.name,
        role: user.role,
        profilePicture: user.profilePicture || Profile,
        id: user.id,
      }
    : { name: "Guest", role: "Employee", profilePicture: Profile };

  return {
    user: userData,
    loading,
    handleProfileClick,
    handleChangePasswordClick,
    handleAboutClick,
    signOut,
  };
};
