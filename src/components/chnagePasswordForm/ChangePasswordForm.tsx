"use client";
import  {useChangePassword } from "@/hooks/useChangePassword";
import Button from "@/components/button/Button";
import InputField from "@/components/inputField/InputFeild";

const ChangePasswordForm = () => {
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
    isOpen && (
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
    )
  );
};

export default ChangePasswordForm;
