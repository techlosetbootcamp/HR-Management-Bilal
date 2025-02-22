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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addEmployee(form));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setForm((prev) => ({
        ...prev,
        [name]: files[0], 
      }));
    }
  };

  const handleFileUpload = (fieldName: string, file: File) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: file,
    }));
  };

  return { form, handleChange, handleSubmit, loading, error, handleImageUpload, handleFileUpload };
}
