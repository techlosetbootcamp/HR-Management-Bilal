import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
import { FileUploadProps } from "@/types/empoyee";

const FileUpload: React.FC<FileUploadProps> = ({
  accept = "image/*, .pdf",
  onFileSelect,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div className="border-2 border-dashed border-orange-500 rounded-lg p-6 text-center space-y-3">
      <label className="cursor-pointer flex flex-col items-center">
        <div className="bg-orange-500 p-3 rounded-full">
          <UploadCloud size={20} className="text-white" />
        </div>
        {fileName ? (
          <p className="mt-2 text-gray-700 text-sm">{fileName}</p>
        ) : (
          <p className="text-gray-400 text-sm mt-2">
            Drag & Drop or{" "}
            <span className="text-orange-500 font-semibold">choose file</span>{" "}
            to upload
          </p>
        )}
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept={accept}
        />
      </label>
      <p className="text-gray-500 text-xs">Supported formats: {accept}</p>
    </div>
  );
};

export default FileUpload;
