import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addEmployee } from "@/redux/slice/employeeSlice";
import { useRouter } from "next/navigation";

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
    relivingLetter: "",
    maritalStatus: "",
    photoURL: "", // ✅ Profile Picture
    status: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Cloudinary File Upload (Handles Both Images & PDFs)
  const handleFileUpload = async (fieldName: string, file: File) => {
    if (!file) {
      console.warn(`No file provided for ${fieldName}`);
      return;
    }

    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!uploadPreset || !cloudName) {
      console.error("Missing Cloudinary configuration!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    // ✅ Determine file type
    const isPDF = file.type === "application/pdf";
    const resourceType = isPDF ? "raw" : "image"; // `raw` for PDFs, `image` for pictures

    try {
      console.log(`📤 Uploading ${fieldName} as ${isPDF ? "PDF" : "Image"}...`);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed: ${await response.text()}`);
      }

      const data = await response.json();
      console.log(`✅ ${fieldName} uploaded successfully:`, data.secure_url);

      setForm((prev) => ({
        ...prev,
        [fieldName]: data.secure_url, // ✅ Store uploaded file URL
      }));
    } catch (error) {
      console.error(`❌ File upload failed for ${fieldName}:`, error);
      alert("File upload failed. Please check your Cloudinary settings.");
    }
  };

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(addEmployee(form)).unwrap();
      console.log("✅ Employee added successfully!");
      router.push("/employees");
    } catch (error) {
      console.error("❌ Error adding employee:", error);
    }
  };

  return { form, setForm, handleChange, handleSubmit, loading, error, handleFileUpload };
}
