import React, { useRef } from "react";
import { CalendarDays } from "lucide-react";

interface InputFieldProps {
  label?: string; // New prop to control label display
  type?: "text" | "email" | "password" | "date" | "number" | "select";
  name: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  isEditMode?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  showLabel?: boolean; // New prop to control label display
  className?: string;
  disabled?: boolean;
}

const EmployeeInput: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  name,
  value = "",
  placeholder,
  required = false,
  options,
  isEditMode = true,
  onChange,
  showLabel = true, // Default is true
  className,
  disabled = false,

}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker();
    }
  };

  return (
    <div className="flex flex-col">
            {showLabel && label && <label className="text-sm text-gray-400 mb-1">{label}</label>}

      {isEditMode ? (
        type === "select" ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="border p-2 rounded-xl w-full dark:bg-[#131313] text-white border-gray-700 h-[56px]"
          >
            <option value="" disabled>{placeholder || "Select an option"}</option>
            {options?.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        ) : (
          <div className="relative flex items-center border border-gray-700 rounded-xl w-full text-white bg-[#131313]">
            <input
              disabled={disabled}
              ref={inputRef}
              type={type}
              name={name}
              value={value}
              placeholder={placeholder || label}
              onChange={onChange}
              required={required}
              className={`bg-transparent outline-none w-full h-[56px] pl-3 pr-10 text-white` + className}
            />
            {type === "date" && (
              <button
                type="button"
                onClick={handleIconClick}
                className="absolute right-3 cursor-pointer"
              >
                <CalendarDays  size={24} />
              </button>
            )}
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

export default EmployeeInput;
