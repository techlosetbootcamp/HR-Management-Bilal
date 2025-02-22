import React, { useState } from "react";
import { UploadCloud } from "lucide-react";

interface FileUploadProps {
  label: string;
  onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  return (
    <div className="border-2 border-dashed border-orange-500 rounded-lg p-6 text-center space-y-3">
      <label className="cursor-pointer flex flex-col items-center">
        <div className="bg-orange-500 p-3 rounded-full">
          <UploadCloud size={20} className="text-white" />
        </div>
        {selectedFile ? (
          <p className="text-gray-300 text-sm mt-2">{selectedFile.name}</p>
        ) : (
          <p className="text-gray-400 text-sm mt-2">
            Drag & Drop or{" "}
            <span className="text-orange-500 font-semibold">choose file</span> to upload
          </p>
        )}
        <input type="file" className="hidden" onChange={handleFileChange} />
      </label>
      <p className="text-gray-500 text-xs">Supported formats: .jpeg, .pdf</p>
    </div>
  );
};

export default FileUpload;
