import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployeeById,
  updateEmployeeDetails,
  uploadImage,
} from "@/redux/slice/employeeSlice";
import { RootState, AppDispatch } from "../../redux/store";
import { Employee } from "@/types/types";
import toast from "react-hot-toast";

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

      let updatePayload: Partial<Employee> = { ...updatedFields };

      if (selectedFile) {
        console.log("📸 Uploading new image...");
        const uploadResult = await dispatch(
          uploadImage({
            file: selectedFile,
            fieldName: employee.photoPublicId || "",
          })
        ).unwrap();
        
        console.log("Image uploaded successfully:", uploadResult);
        
        updatePayload = {
          ...updatePayload,
          photoURL: uploadResult.secure_url,
          photoPublicId: uploadResult.fieldName
        };

        setUpdatedImage(uploadResult.secure_url);
        toast.success("Profile image updated successfully!");
      }

      if (Object.keys(updatePayload).length > 0) {
        console.log("Sending update request:", updatePayload);
        const updateResponse = await dispatch(
          updateEmployeeDetails({
            id: employee.id,
            updates: updatePayload
          })
        ).unwrap();

        console.log("MongoDB update response:", updateResponse);

        const refreshedData = await dispatch(fetchEmployeeById(id)).unwrap();
        console.log("Refreshed employee data:", refreshedData);
      }

      setUpdatedFields({});
      setUpdatedImage(null);
      setSelectedFile(null);
      
      router.push(`/employees/${id}`);
      toast.success("Changes saved successfully!");
    } catch (err) {
      console.error("Error saving changes:", err);
      toast.error("Failed to update profile image");
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
