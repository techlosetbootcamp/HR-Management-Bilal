"use client";
import { useChangePassword } from "@/hooks/useChangePassword";

const ChangePasswordForm = () => {
  const { handleSubmit, handleChange, loading, newPassword, confirmPassword } = useChangePassword();

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={handleChange}
          value={newPassword}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={handleChange}
          value={confirmPassword}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Changing..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;