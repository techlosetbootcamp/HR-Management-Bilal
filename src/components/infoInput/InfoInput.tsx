import React from "react";

interface InputFieldProps {
  label?: string; // Added label support
  type?: "text" | "email" | "password" | "date" | "select" | "number";
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  required?: boolean;
  options?: string[]; // For select dropdowns
  icon?: React.ReactNode; // Icon support
}

export default function InfoInput({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required = false,
  options,
  icon,
}: InputFieldProps) {
  return (
    <div className="">
      {/* Label for input */}
      {label && <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>}
      
      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="border p-2 rounded w-full bg-[#131313] text-white border-gray-700 h-[45px]"
        >
          <option value="" disabled>{placeholder || "Select an option"}</option>
          {options?.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <div className="flex items-center border pl-2 rounded-lg border-gray-700 w-full text-white">
          {icon && <span className="mr-2 text-gray-400">{icon}</span>}
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className="bg-transparent outline-none w-[510px] h-[46px]"
          />
        </div>
      )}
    </div>
  );
}
