"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("/default-avatar.png");
  const [previewImage, setPreviewImage] = useState(profilePicture);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSessionLoading, setIsSessionLoading] = useState(true); // Track session loading state

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

    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/auth/register?email=${session.user.email}`);
        if (!res.ok) {
          const errorData = await res.json();
          console.error("Failed to fetch user data:", errorData.error || res.statusText);
          throw new Error(errorData.error || "Failed to fetch user data");
        }

        const userData = await res.json();
        console.log("User data fetched:", userData); // Debugging log

        setName(userData.name);
        setEmail(userData.email);
        setProfilePicture(userData.profilePicture || "/default-avatar.png");
        setPreviewImage(userData.profilePicture || "/default-avatar.png");
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsSessionLoading(false);
      }
    };

    fetchUserData();
  }, [session, status]);

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
    setLoading(true);

    let uploadedImageUrl = profilePicture;

    if (file) {
      const imageData = new FormData();
      imageData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: imageData,
      });

      const uploadData = await uploadRes.json();
      if (uploadRes.ok) {
        uploadedImageUrl = uploadData.imageUrl;
      } else {
        alert("Image upload failed");
        setLoading(false);
        return;
      }
    }

    const updateRes = await fetch("/api/auth/register", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, profilePicture: uploadedImageUrl }),
    });

    const updateData = await updateRes.json();
    if (updateRes.ok) {
      setName(updateData.user.name);
      setEmail(updateData.user.email);
      setProfilePicture(updateData.user.profilePicture);
      setPreviewImage(updateData.user.profilePicture);

      if (session) {
        await update({
          ...session,
          user: {
            ...session.user,
            name: updateData.user.name,
            email: updateData.user.email,
            image: updateData.user.profilePicture,
          },
        });
      }

      alert("Profile updated successfully!");
    } else {
      alert("Profile update failed");
    }

    setLoading(false);
  };

  if (isSessionLoading) {
    return <div>Loading session...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-black rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-black">
        <div>
          <label className="block">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded bg-black"
          />
        </div>

        <div>
          <label className="block ">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded bg-black"
          />
        </div>

        <div>
          <p className="text-gray-600 mb-2">Profile Picture Preview:</p>
          <Image width={40} height={40} src={previewImage} alt="Profile Preview" className="w-24 h-24 rounded-full mb-2 border" />
          <input type="file" accept="image/*" onChange={handleFileChange} className="block" />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}