import { ButtonProps } from "@/types/types";
import React from "react";

const Button: React.FC<ButtonProps> = ({
  type = "button",
  disabled,
  children,
  onClick,
  className,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-full py-[11px] px-5 rounded-[10px] text-white text-[16px] font-[300] transition-all duration-300 border-[1px] border-customOrange 
        ${disabled ? "bg-customBlack cursor-progress" : "bg-customOrange"} 
        ${
          !disabled &&
          "ease-in-out hover:text-customOrange hover:bg-[#fff] dark:hover:bg-customBlack hover:border-customOrange"
        } 
        ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
