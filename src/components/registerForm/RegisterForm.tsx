"use client";
import InputField from "@/components/inputField/InputFeild";
import { useRegisterForm } from "./useRegisterForm";

const RegisterForm = () => {
  const { formData, handleChange, handleSubmit } = useRegisterForm();

  return (
    <form onSubmit={handleSubmit} className="text-white rounded shadow-lg">
      <InputField
        type="text"
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <InputField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button className="w-full text-white py-2 rounded-lg bg-orange-600">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
