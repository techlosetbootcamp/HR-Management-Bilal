import React from "react";

interface InputFieldProps {
  label?: string;
  type?: "text" | "email" | "password" | "date" | "number" | "select";
  name: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  isEditMode?: boolean;
  icon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  name,
  value = "",
  placeholder,
  required = false,
  options,
  isEditMode = true,
  icon,
  onChange,
}) => {
  return (
    <div className="flex flex-col">
      {label && <label className="text-sm text-gray-400 mb-1">{label}</label>}

      {isEditMode ? (
        type === "select" ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="border p-2 rounded w-full dark:bg-[#131313] text-white border-gray-700 h-[45px]"
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
              value={value}
              placeholder={placeholder}
              onChange={onChange}
              required={required}
              className="bg-transparent outline-none w-full h-[46px]"
            />
          </div>
        )
      ) : (
        <p className="dark:bg-[#131313] dark:text-gray-300 p-2 rounded-md">
          {value || "N/A"}
        </p>
      )}
    </div>
  );
};

export default InputField;
