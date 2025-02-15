"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/component/inputField/InputFeild";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    router.push("/login");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-lg">
      <InputField label="Name" name="name" value={formData.name} onChange={handleChange} />
      <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
      <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
      <button className="w-full bg-green-500 text-white py-2 rounded-lg">Register</button>
    </form>
  );
}
