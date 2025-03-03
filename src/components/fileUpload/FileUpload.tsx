import React, { useState } from "react";
import { UploadCloud } from "lucide-react";

interface FileUploadProps {
  label: string;
  onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({  onFileSelect }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
      onFileSelect(file);
    }
  };

  return (
    <div className="border-2 border-dashed border-orange-500 rounded-lg p-6 text-center space-y-3">
      <label className="cursor-pointer flex flex-col items-center">
        <div className="bg-orange-500 p-3 rounded-full">
          <UploadCloud size={20} className="text-white" />
        </div>
        {preview ? (
          <img src={preview} alt="Preview" className="mt-2 w-24 h-24 rounded-full object-cover" />
        ) : (
          <p className="text-gray-400 text-sm mt-2">
            Drag & Drop or <span className="text-orange-500 font-semibold">choose file</span> to upload
          </p>
        )}
        <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
      </label>
      <p className="text-gray-500 text-xs">Supported formats: .jpeg, .png</p>
    </div>
  );
};

export default FileUpload;
