"use client"; 

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import InputField from "@/component/inputField/InputFeild";

export default function LoginPage() {
  useAuth(true); 

  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", { ...formData, redirect: false });
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-lg">
      <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
      <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
      <button className="w-full bg-blue-500 text-white py-2 rounded-lg">Login</button>
    </form>
  );
}
