"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import InputField from "@/component/inputField/InputFeild";
import Link from "next/link";
export default function LoginPage() {
  useAuth(true);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error before submitting

    // 🔹 Basic Validation
    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    const response = await signIn("credentials", {
      ...formData,
      redirect: false,
    });

    if (response?.error) {
      setError("Invalid credentials. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-lg">
      <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
      <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* 🔹 Show error message */}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded-lg text-white ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
    <div>
      <h3>Forget Password</h3>
      <Link href="../forgetPassword/">Forgot Password?</Link>
    </div>
    </>
  );
}
