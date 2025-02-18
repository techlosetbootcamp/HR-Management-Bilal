import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset" ;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ type = "button", disabled, children, onClick, className }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-full py-3 rounded-[10px] text-white text-[16px] font-[300] transition-all duration-300 ${
        disabled ? "bg-gray-400 cursor-not-allowed" : "bg-customOrange hover:bg-orange-600"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
