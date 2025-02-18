import { useState } from "react";
import { useRouter } from "next/navigation";

export const useRegisterForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(""); // Single error message
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if any field is empty
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError("Please fill all the fields.");
      return;
    }

    await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    router.push("/login");
  };

  return { formData, handleChange, handleSubmit, error };
};
