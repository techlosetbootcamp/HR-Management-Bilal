import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  getProfileByEmail,
  updateProfile,
  uploadProfileImage,
} from "@/redux/slice/authSlice";
import { RootState,  useAppDispatch, useAppSelector } from "@/redux/store";
import toast from "react-hot-toast";

export function useProfile() {
  const dispatch = useAppDispatch();
  const { data: session, status, update } = useSession();

  const { user, loading, error, successMessage } = useAppSelector(
    (state: RootState) => state.auth
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("/default-avatar.png");
  const [previewImage, setPreviewImage] = useState("/default-avatar.png");
  const [file, setFile] = useState<File | null>(null);
  const [isSessionLoading, setIsSessionLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      setIsSessionLoading(true);
      return;
    }

    if (status === "unauthenticated" || !session?.user?.email) {
      console.error("No email found in session");
      setIsSessionLoading(false);
      return;
    }

    dispatch(getProfileByEmail(session.user.email))
      .unwrap()
      .then(() => {
        setIsSessionLoading(false);
      })
      .catch(() => {
        setIsSessionLoading(false);
      });
  }, [session, status, dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setProfilePicture(user.profilePicture || "/default-avatar.png");
      setPreviewImage(user.profilePicture || "/default-avatar.png");
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setPreviewImage(fileReader.result as string);
    };
    fileReader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let uploadedImageUrl = profilePicture;

    if (file) {
      try {
        uploadedImageUrl = await dispatch(uploadProfileImage(file)).unwrap();
      } catch (error) {
        console.error("Image upload failed:", error);
        return;
      }
    }

    const result = await dispatch(
      updateProfile({
        name,
        email,
        profilePicture: uploadedImageUrl,
      })
    ).unwrap();

    if (result && session) {
      await update({
        ...session,
        user: {
          ...session.user,
          name: result.name,
          email: result.email,
          image: result.profilePicture,
        },
      });
      toast.success("Profile updated successfully!");
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    profilePicture,
    previewImage,
    file,
    loading,
    error,
    successMessage,
    isSessionLoading,
    handleFileChange,
    handleSubmit,
  };
}
