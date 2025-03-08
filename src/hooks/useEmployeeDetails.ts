import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployeeById,
  updateEmployeeDetails,
  uploadImage,
} from "@/redux/slice/employeeSlice";
import { RootState, AppDispatch } from "../redux/store";
import { Employee } from "@/types/types";

export function useEmployeeDetails(id: string) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { employee, loading, error } = useSelector(
    (state: RootState) => state.employees
  );

  const [updatedFields, setUpdatedFields] = useState<Partial<Employee>>({});
  const [updatedImage, setUpdatedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchEmployeeById(id));
    }
  }, [id, dispatch]);

  const handleUpdate = (field: string, value: string) => {
    setUpdatedFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setUpdatedImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const saveChanges = async () => {
    try {
      if (!employee) return;
      let newPhotoURL = employee.photoURL;
      let newPublicId = employee.photoPublicId;

      if (selectedFile) {
        console.log("📸 Uploading new image...");
        const uploadResult = await dispatch(
          uploadImage({
            file: selectedFile,
            oldPublicId: employee.photoPublicId,
          })
        ).unwrap();
        console.log("Image uploaded successfully:", uploadResult);
        newPhotoURL = uploadResult.secure_url;
        newPublicId = uploadResult.public_id;
      }

      const updatePayload: Partial<Employee> = {
        ...updatedFields,
        ...(newPhotoURL ? { photoURL: newPhotoURL } : {}),
        ...(newPublicId ? { photoPublicId: newPublicId } : {}),
      };

      if (Object.keys(updatePayload).length === 0) {
        alert("No changes detected.");
        return;
      }

      console.log(" Sending update request:", updatePayload);
      dispatch(
        updateEmployeeDetails({ id: employee.id, updates: updatePayload })
      );

      setUpdatedFields({});
      setUpdatedImage(null);
      setSelectedFile(null);
      alert("Profile updated successfully!");
      router.push(`/employees/${id}`);
    } catch (err) {
      console.error("Error saving changes:", err);
      alert("Error updating profile.");
    }
  };

  return {
    employee,
    loading,
    error,
    handleUpdate,
    updatedFields,
    saveChanges,
    handleImageChange,
    updatedImage,
  };
}
