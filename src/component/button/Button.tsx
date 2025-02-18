import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;