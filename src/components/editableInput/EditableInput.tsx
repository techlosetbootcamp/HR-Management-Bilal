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
      <label className="text-gray-400 text-sm">{label}</label>
      {isEditMode ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="bg-gray-800 text-white border border-gray-600 p-2 rounded-md"
        />
      ) : (
        <p className="bg-gray-900 text-gray-300 p-2 rounded-md">{value || "N/A"}</p>
      )}
    </div>
  );
};

export default EditableInput;
