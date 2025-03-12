import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addEmployee, uploadImage } from "@/redux/slice/employeeSlice";
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
    photoPublicId: "", // ✅ Public ID for Cloudinary
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Cloudinary File Upload (Handles Both Images & PDFs)
  const handleFileUpload = async (file: File,fieldName: string) => {
    try {
      const result = await dispatch(uploadImage({ file, fieldName })).unwrap();
      setForm((prev) => ({
        ...prev,
        [fieldName]: result.secure_url,
      }));
    } catch (error) {
      console.error(`❌ File upload failed for ${fieldName}:`, error);
      alert("File upload failed. Please try again.");
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
