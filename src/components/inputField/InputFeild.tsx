import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // Import eye icons

interface InputProps {
  type: string;
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputProps> = ({ type, label, value, onChange, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative w-full mb-5">
      <input
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder=" " 
        className="peer w-full py-5 px-[24px] text-white bg-[#131313] border border-customOrange rounded-lg focus:outline-none focus:border-orange-700 transition-all duration-300"
      />

      {/* Password Visibility Toggle Button */}
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-200 hover:text-customOrange transition-colors"
        >
          {showPassword ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
        </button>
      )}

      <label className="absolute left-3 top-3 transform -translate-y-[10px] ease-in-out text-customOrange font-[300] transition-all duration-200 scale-75 peer-focus-within:scale-100 peer-focus-within:-top-3 peer-focus:top-3 peer-focus:text-customOrange peer-focus:text-[11px]">
        {label}
      </label>
    </div>
  );
};

export default InputField;
