"use client";
import React, { useRef } from "react";
import { CalendarDays, Clock } from "lucide-react";
import { InputFieldProps } from "@/types/types";

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
  showLabel = true,
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
      {showLabel && label && (
        <label className="text-sm text-gray-400 mb-1">{label}</label>
      )}

      {isEditMode ? (
        type === "select" ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="border p-2 rounded-xl w-full dark:bg-[#131313] dark:text-white border-gray-700 h-[56px]"
          >
            <option value="" disabled>
              {placeholder || "Select an option"}
            </option>
            {options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <div className="relative flex items-center border dark:border-gray-700 border-gray-300 rounded-xl w-full dark:text-white dark:bg-[#131313]">
            <input
              disabled={disabled}
              ref={inputRef}
              type={type}
              name={name}
              value={value}
              placeholder={placeholder || label}
              onChange={onChange}
              required={required}
              className={`bg-transparent outline-none w-full h-[56px] pl-3 pr-10 dark:g-[#131313] bg-gray-200 dark:text-white ${className}`}
            />
            {type === "date" && (
              <button
                type="button"
                onClick={handleIconClick}
                className="absolute right-3 cursor-pointer"
              >
                <CalendarDays size={24} />
              </button>
            )}
            {type === "time" && (
              <button
                type="button"
                onClick={handleIconClick}
                className="absolute right-3 cursor-pointer"
              >
                <Clock size={24} className="dark:text-white text-black" />
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
