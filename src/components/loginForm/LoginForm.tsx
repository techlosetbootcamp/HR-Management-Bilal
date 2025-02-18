"use client";
import Link from "next/link";
import { useLoginForm } from "./useLoginForm";
import InputField from "../inputField/InputFeild";

const LoginForm = () => {
  const { formData, handleChange, handleSubmit, error, loading } =
    useLoginForm();

  return (
    <div className="flex flex-col max-w-[445px]">
      <form
        onSubmit={handleSubmit}
        className={`bg-[#131313] rounded shadow-lg w-full`}
      >
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

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="flex w-full text-center justify-between text-neutral-500 mt-3 mb-[25px]">
          <div className="flex ">
            <input
              id="orange-checkbox"
              type="checkbox"
              className="w-5 h-5 accent-customOrange"
            />
            <span className="text-[16px] font-[300] ml-2 text-white">
              {" "}
              Remember me
            </span>
          </div>
          <Link
            href={"/register"}
            className="font-light text-customOrange me-4"
          >
            Don&apos;t have an acount?
          </Link>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-[10px] text-white text-[16px] font-[300] ${
            loading ? "bg-gray-400" : "bg-customOrange"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <Link href={"/forgetPassword"} className="text-customOrange mt-1 flex justify-center items-center">
        Forget Password?
      </Link>
    </div>
  );
};

export default LoginForm;
