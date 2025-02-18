"use client";
import useChangePassword from "@/hooks/useChangePassword";

const ChangePasswordForm = () => {
  const {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    handleChangePassword,
    loading,
    error,
    successMessage,
    resetMessages,
  } = useChangePassword();

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Change Password</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleChangePassword();
        }}
        className="space-y-4"
      >
        <input
          type="password"
          placeholder="Old Password"
          className="w-full p-2 border border-gray-300 rounded"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 border border-gray-300 rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      {successMessage && <p className="text-green-500 mt-2 text-center">{successMessage}</p>}
      {(error || successMessage) && (
        <button
          className="mt-2 text-sm text-gray-500 underline"
          onClick={resetMessages}
        >
          Dismiss
        </button>
      )}
    </div>
  );
};

export default ChangePasswordForm;
