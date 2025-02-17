"use client";
import useOtp from "@/hooks/useOtp";

const OtpPage = () => {
  const { otpInput, handleChange, handleSubmit } = useOtp();

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Verify OTP</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="otp"
          value={otpInput}
          onChange={handleChange}
          placeholder="Enter OTP"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OtpPage;
