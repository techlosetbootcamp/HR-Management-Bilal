import React from "react";

interface InputProps {
  type: string;
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputProps> = ({
  type,
  label,
  placeholder,
  value,
  onChange,
  name,
}) => {
  return (
    <div className="relative gap-3 w-full mb-4">
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className="peer w-full p-2 flex text-white bg-[#131313] border-none border-gray-600 rounded focus:outline-none focus:border-orange-600"
      />
      <label
        className="capitalize absolute top-2 left-3 bg-customOrange text-gray-400 transition-all duration-200 ease-in-out peer-focus-within:-translate-y-6 peer-focus-within:translate-x-3 peer-focus-within:text-orange-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:translate-x-0 peer-placeholder-shown:text-gray-400"
      >
        {label}
      </label>
    </div>
  );
};

export default InputField;
