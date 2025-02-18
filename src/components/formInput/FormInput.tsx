import React, { ChangeEvent } from "react";

interface InputProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: string;
  label: string;
  name: string;
}

export default function FormInput({
  value,
  onChange,
  disabled,
  type = "text",
  label,
  name,
}: InputProps) {
  return (
    <div className="relative w-full my-2.5">
      <input
        value={value}
        onChange={onChange}
        disabled={disabled}
        type={type}
        name={name}
        className="outline-none p-4 border-[1px] text-white border-customOrange w-full rounded-[10px] peer bg-primaryBlack"
      />
      <label className="capitalize absolute top-0 text-customOrange left-3 scale-75 peer-focus-within:scale-100 peer-focus-within:-top-3 peer-focus-within:bg-primaryBlack peer-focus-within:px-2 px-0 bg-transparent transition-all duration-200 ease-in-out">
        {label}
      </label>
    </div>
  );
}
