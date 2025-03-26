import ChangePasswordForm from "@/components/chnagePasswordForm/ChangePasswordForm";
import React from "react";

function page() {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="bg-customBlack p-6 rounded-lg shadow-lg max-w-md w-full text-white">
          <h2 className="text-xl font-semibold text-center mb-4">
            Reset Password
          </h2>
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}

export default page;
