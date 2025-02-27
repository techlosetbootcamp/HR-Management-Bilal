import React from "react";

interface EditableInputProps {
  label: string;
  value: string;
  isEditMode: boolean;
  onChange?: (value: string) => void;
}

const EditableInput: React.FC<EditableInputProps> = ({ label, value, isEditMode, onChange }) => {
  return (
    <div className="flex flex-col">
      <label className="dark:text-gray-400 text-sm">{label}</label>
      {isEditMode ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="dark:bg-gray-800 dark:text-white border dark:border-gray-600 p-2 rounded-md"
        />
      ) : (
        <p className="dark:bg-gray-900 dark:text-gray-300 p-2 text-gray-500 rounded-md">{value || "N/A"}</p>
      )}
    </div>
  );
};

export default EditableInput;
