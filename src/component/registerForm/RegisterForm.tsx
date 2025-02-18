"use client";
import InputField from "@/component/inputField/InputFeild";
import { useRegisterForm } from "./useRegisterForm";

const RegisterForm = () => {
  const { formData, handleChange, handleSubmit } = useRegisterForm();

  return (
    <form onSubmit={handleSubmit} className="text-white rounded shadow-lg">
      <InputField
        type="text"
        placeholder="Enter your name"
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <InputField
        placeholder="example@gmail.com"
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <InputField
        placeholder="*******"
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
