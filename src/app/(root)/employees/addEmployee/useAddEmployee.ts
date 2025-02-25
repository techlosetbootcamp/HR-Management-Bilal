import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addEmployee } from "@/redux/slice/employeeSlice";

export default function useAddEmployee() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.employees);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    designation: "",
    department: "",
    joiningDate: "",
    employmentType: "",
    gender: "Male",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    nationality: "",
    officeLocation: "",
    userName: "",
    employeeId: "",
    workingDays: "",
    skypeId: "",
    slackId: "",
    githubId: "",
    salarySlip: "",
    appointmentLetter: "",
    experienceLetter: "",
    relievingLetter: "",
    maritalStatus: "",
    photoURL: "", // ✅ Added Profile Picture
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ Cloudinary Image Upload
  const handleImageUpload = async (fieldName: string, file: File) => {
    if (!file) {
      console.warn(`No file provided for ${fieldName}`);
      return;
    }
  
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || "your_actual_upload_preset";
    
    if (!uploadPreset) {
      console.error("Missing Cloudinary Upload Preset!");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
  
    try {
      console.log(`Uploading ${fieldName} to Cloudinary...`);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${errorText}`);
      }
  
      const data = await response.json();
      console.log(`${fieldName} uploaded successfully:`, data.secure_url);
  
      setForm((prev) => ({
        ...prev,
        [fieldName]: data.secure_url,
      }));
    } catch (error) {
      console.error(`${fieldName} upload failed:`, error);
      alert("Image upload failed. Please check your Cloudinary settings.");
    }
  };
  
  
  

  // ✅ Handle Other File Uploads
  const handleFileUpload = async (fieldName: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || "default_preset");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setForm((prev) => ({
        ...prev,
        [fieldName]: data.secure_url, // ✅ Store file URL
      }));
    } catch (error) {
      console.error(`File upload for ${fieldName} failed:`, error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addEmployee(form));
  };

  return { form, handleChange, handleSubmit, loading, error, handleImageUpload, handleFileUpload };
}
