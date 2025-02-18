"use client";
import Link from "next/link";
import { useLoginForm } from "./useLoginForm";
import InputField from "../inputField/InputFeild";

const LoginForm = () => {
  const { formData, handleChange, handleSubmit, error, loading } =
    useLoginForm();

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-[#131313] rounded shadow-lg w-full">
        <InputField
          placeholder="example@gmail.com"
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          placeholder="**********"
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white ${
            loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div>
        <h3>Forget Password</h3>
        <Link href="../forgotPassword/">Forgot Password?</Link>
      </div>
    </>
  );
};

export default LoginForm;
