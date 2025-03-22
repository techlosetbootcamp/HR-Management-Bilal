import { useState } from "react";
import {  useAppSelector, RootState, useAppDispatch } from "@/redux/store";
import { addEmployee, fetchEmployees, uploadImage } from "@/redux/slice/employeeSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function useAddEmployee() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state: RootState) => state.employees);

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
    photoURL: "",
    status: "",
    photoPublicId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = async (file: File, fieldName: string) => {
    try {
      const result = await dispatch(uploadImage({ file, fieldName })).unwrap();
      setForm((prev) => ({
        ...prev,
        [fieldName]: result.secure_url,
      }));
    } catch (error) {
      console.error(` File upload failed for ${fieldName}:`, error);
      alert("File upload failed. Please try again.");
    }
  };

  const router = useRouter();
  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "designation",
      "department",
      "joiningDate",
      "employmentType",
      "gender",
      "dateOfBirth",
      "address",
      "city",
      "state",
      "zipCode",
      "nationality",
      "officeLocation",
      "employeeId",
      "workingDays",
      "maritalStatus",
      "photoURL",
    ];

    for (const field of requiredFields) {
      if (!form[field as keyof typeof form]) {
        toast.error(
          `Please fill in the ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`
        );
        return false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(addEmployee(form)).unwrap();
      dispatch(fetchEmployees())
      toast.success("Employee added successfully!");
      router.push("/employees");
    } catch (error) {
      console.error("Error adding employee:", error);
      toast.error("Failed to add employee. Please try again.");
    }
  };

  return {
    form,
    setForm,
    handleChange,
    handleSubmit,
    loading,
    error,
    handleFileUpload,
  };
}
