"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [profilePicture, setProfilePicture] = useState(session?.user?.image || "/default-avatar.png");
  const [previewImage, setPreviewImage] = useState(profilePicture);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    // Show preview of selected file
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

    // ✅ 1. Upload picture to Cloudinary if a new file is selected
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

    // ✅ 2. Update user profile with new data
    const updateRes = await fetch("/api/user/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, profilePicture: uploadedImageUrl }),
    });

    const updateData = await updateRes.json();
    if (updateRes.ok) {
      setProfilePicture(updateData.user.profilePicture);
      if (session) {
       await update({
          ...session,
          user: {
            ...session.user,
            name,
            email,
            image: uploadedImageUrl,
          },
        }); // Refresh session
      }
      alert("Profile updated successfully!");
    } else {
      alert("Profile update failed");
    }

    setLoading(false);
  };

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
          <img src={previewImage} alt="Profile Preview" className="w-24 h-24 rounded-full mb-2 border" />
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
