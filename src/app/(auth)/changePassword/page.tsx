'use client'
import Button from "@/components/button/Button";
import React from "react";
import { useChangePassword } from "./useChangePassword";
import InputField from "@/components/inputField/InputFeild";

export default function Page() {
  const {
    handleSubmit,
    handleChange,
    loading,
    newPassword,
    confirmPassword,
    isOpen,
    handleClose,
  } = useChangePassword();

  return (
    <div>
      <div className="flex items-center justify-center bg-black h-screen">
        <div className="bg-customBlack p-6 rounded-lg text-white w-[450px]">
          <h1 className="text-xl font-semibold text-center mb-4">
            Reset Password
          </h1>
          {isOpen && (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                  type="password"
                  label="New Password"
                  name="newPassword"
                  value={newPassword}
                  onChange={handleChange}
                />
                <InputField
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                />

                <Button type="submit" disabled={loading}>
                  {loading ? "Changing..." : "Reset Password"}
                </Button>
              </form>

              <Button
                type="button"
                onClick={handleClose}
                className="bg-gray-500 hover:bg-gray-600 mt-4"
              >
                Close
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
