"use client";
import Button from "../button/Button";
import InputField from "../inputField/InputFeild";
import { useRegisterForm } from "./useRegisterForm";

const RegisterForm = () => {
  const { formData, handleChange, handleSubmit, error, loading } =
    useRegisterForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="text-white bg-customBlack rounded-lg shadow-lg"
    >
      {error && (
        <p className="text-red-500 text-sm text-center mb-3">{error}</p>
      )}
      <InputField
        type="text"
        label="User Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <InputField
        type="email"
        label="Email Address"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <InputField
        type="password"
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />

      <Button type="submit" disabled={loading}>
        {loading ? (
          <span className="text-customOrange cursor-progress">
            Navigating...
          </span>
        ) : (
          "Register"
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
