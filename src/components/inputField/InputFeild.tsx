import React from "react";

interface InputProps {
  type: string;
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputProps> = ({ type, label, value, onChange, name }) => {
  return (
    <div className="relative w-full mb-5">
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder=" " 
        className="peer w-full py-4 px-[18px] text-white bg-[#131313] border border-customOrange rounded-lg focus:outline-none focus:border-orange-700 transition-all duration-300"
      />

      <label className=" absolute left-3 top-3 transform -translate-y-[10px] ease-in-out text-customOrange font-[300] transition-all duration-200 scale-75 peer-focus-within:scale-100 peer-focus-within:-top-3 peer-focus:top-3 peer-focus:text-customOrange peer-focus:text-[11px]">
        {label}
      </label>
    </div>
  );
};

export default InputField;
