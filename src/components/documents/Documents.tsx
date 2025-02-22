import React from "react";
import FileUpload from "@/components/fileUpload/FileUpload";

interface DocumentsProps {
  handleFileUpload: (fieldName: string, file: File) => void;
}

const Documents: React.FC<DocumentsProps> = ({ handleFileUpload }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-gray-400 mb-2">Upload Appointment Letter</h3>
          <FileUpload label="Upload Appointment Letter" onFileSelect={(file) => handleFileUpload("appointmentLetter", file)} />
        </div>
        <div>
          <h3 className="text-gray-400 mb-2">Upload Salary Slips</h3>
          <FileUpload label="Upload Salary Slips" onFileSelect={(file) => handleFileUpload("salarySlip", file)} />
        </div>
        <div>
          <h3 className="text-gray-400 mb-2">Upload Relieving Letter</h3>
          <FileUpload label="Upload Relieving Letter" onFileSelect={(file) => handleFileUpload("relievingLetter", file)} />
        </div>
        <div>
          <h3 className="text-gray-400 mb-2">Upload Experience Letter</h3>
          <FileUpload label="Upload Experience Letter" onFileSelect={(file) => handleFileUpload("experienceLetter", file)} />
        </div>
      </div>
    </div>
  );
};

export default Documents;
