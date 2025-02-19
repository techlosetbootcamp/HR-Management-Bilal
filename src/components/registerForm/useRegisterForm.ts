import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios"; 

export const useRegisterForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError("Please fill all the fields.");
      toast.error("Please fill all the fields.");
      return;
    }

    try {
      await axios.post("/api/auth/register", formData, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Successfully registered!");
      router.push("/login");
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  };

  return { formData, handleChange, handleSubmit, error };
};
