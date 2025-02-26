interface EditableSelectProps {
    label: string;
    value?: string;
    options: string[];
    isEditMode: boolean;
    onChange?: (value: string) => void;
  }
  
  const EditableSelect: React.FC<EditableSelectProps> = ({ label, value = "", options, isEditMode, onChange }) => {
    return (
      <div className="flex flex-col">
        <label className="text-gray-400 text-sm">{label}</label>
        {isEditMode ? (
          <select
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            className="bg-gray-800 text-white border border-gray-600 p-2 rounded-md"
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <p className="bg-gray-900 text-gray-300 p-2 rounded-md">{value || "N/A"}</p>
        )}
      </div>
    );
  };
  
  export default EditableSelect;
  