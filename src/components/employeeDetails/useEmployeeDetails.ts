import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployeeById,
  updateEmployeeDetails,
  uploadImage,
} from "@/redux/slice/employeeSlice";
import { RootState, AppDispatch } from "../../redux/store";
import { Employee } from "@/types/types";
import toast from "react-hot-toast";
import { fetchAttendanceById } from "@/redux/slice/attandanceSlice";
import { completeProject, fetchEmployeeProjects } from "@/redux/slice/projectSlice";

export function useEmployeeDetails(id: string) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { employee, loading, error } = useSelector(
    (state: RootState) => state.employees
  );

  const { projects} = useSelector(
    (state: RootState) => state.projects
  );
  const employeeData: Employee | null = employee;

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
      if (!employeeData) return; // Use employeeData

      let updatePayload: Partial<Employee> = { ...updatedFields };

      if (selectedFile) {
        console.log("📸 Uploading new image...");
        const uploadResult = await dispatch(
          uploadImage({
            file: selectedFile,
            fieldName: employeeData.photoPublicId || "", // Use employeeData
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
            id: employeeData.id, // Use employeeData
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
const [pdfPreview, setPdfPreview] = useState<string | null>(null);

  const openPdfPreview = (url: string) => {
    console.log("Opening PDF:", url);
    setPdfPreview(url);
  };

  const getPdfUrl = (url: string) => {
    return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
      url
    )}`;
  };

  const closePdfPreview = () => {
    setPdfPreview(null);
  };
    const searchParams = useSearchParams();
    const [isEditing, setIsEditing] = useState(
      searchParams.get("edit") === "true"
    );
  const handleEditSaveClick = async () => {
    if (isEditing) {
      await saveChanges();
      setIsEditing(false);
      router.push(`/employees/${employee?.id}`);
    } else {
      setIsEditing(true);
      router.push(`/employees/${employee?.id}?edit=true`);
    }
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return "—";
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Optional: Use 12-hour format
    });
  };
  // Replace the local state and useEffect with Redux selector
  const { attendanceRecords } = useSelector((state: RootState) => state.attandance);
  
  useEffect(() => {
    if (id) {
      dispatch(fetchEmployeeById(id));
      dispatch(fetchAttendanceById(id));
      dispatch(fetchEmployeeProjects(id))
    }
  }, [id, dispatch]);
  
  const handleComplete = (projectId: string) => {
      dispatch(completeProject(projectId));

    };
  
  return {
    isEditing,
    formatDate,
    attendanceRecords,
    formatTime,
    pdfPreview,
    handleEditSaveClick,
    openPdfPreview,
    closePdfPreview,
    getPdfUrl,
    employee: employeeData, // Return employeeData
    loading,
    handleComplete,
    projects,
    error,
    handleUpdate,
    updatedFields,
    saveChanges,
    handleImageChange,
    updatedImage,
  };
}
