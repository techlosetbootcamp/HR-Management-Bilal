// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store";
// import { fetchEmployeeById, updateEmployeeDetails } from "@/redux/slice/employeeDetailsSlice";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// export const useEmployeeDetails = (id: string) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { employee, loading, error } = useSelector((state: RootState) => state.employeeDetails);
//   const [isEditMode, setIsEditMode] = useState(false);

//   useEffect(() => {
//     if(id){
//     dispatch(fetchEmployeeById(id));
//     }
//   }, [dispatch, id]);

//   const toggleEditMode = () => setIsEditMode(!isEditMode);

//   const handleUpdate = (field: string, value: string) => {
//     dispatch(updateEmployeeDetails({ [field]: value }));
//   };

//   return { employee, loading, error, isEditMode, toggleEditMode, handleUpdate };
// };
// import { useState, useEffect } from "react";

// export function useEmployeeDetails(id: string) {
//   const [employee, setEmployee] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchEmployee() {
//       try {
//         const response = await fetch(`/api/employee/${encodeURIComponent(id)}`);
//         if (!response.ok) throw new Error("Failed to fetch employee details");
//         const data = await response.json();
//         setEmployee(data);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     if (id) fetchEmployee();
//   }, [id]);

//   const handleUpdate = async (field: string, value: string) => {
//     setEmployee((prev) => ({ ...prev, [field]: value })); // Optimistic update

//     try {
//       const res = await fetch(`/api/employee/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ [field]: value }),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         console.error("Update failed:", errorData);
//         alert(`Error: ${errorData.error}`);
//         return;
//       }

//       // ✅ Fetch updated employee data after a successful update
//       const updatedRes = await fetch(`/api/employee/${id}`);
//       const updatedEmployee = await updatedRes.json();
//       setEmployee(updatedEmployee); // Update UI with fresh data
//     } catch (err) {
//       console.error("Network error:", err);
//     }
//   };

//   const saveChanges = async () => {
//     try {
//       const response = await fetch(`/api/employee/${encodeURIComponent(id)}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(employee),
//       });

//       if (!response.ok) throw new Error("Failed to update employee details");

//       alert("Employee details updated successfully!");
//     } catch (err: any) {
//       setError(err.message);
//       alert("Error updating employee details");
//     }
//   };

//   return { employee, loading, error, handleUpdate, saveChanges };
// }


// Define an Employee interface based on usage
export interface Employee {
  id: string;
  firstName?: string;
  lastName: string;
  email: string;
  department: string;
  designation: string;
  dateOfBirth: string
  zipCode: string
  state: string
  city: string;
  gender: string;
  mobileNumber: string;
  photoURL?: string;
  salarySlip?: string;
  address: string;
  maritalStatus: string
  nationality: string
  employeeId: string
  userName: string
  employmentType: string
  status: string
  workingDays: string
  joiningDate: string
  officeLocation: string
  [key: string]: string |File | undefined;
  photoPublicId?: string;
  slackId: string
  skypeId: string
  githubId: string
}

export function useEmployeeDetails(id: string) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedFields, setUpdatedFields] = useState<Partial<Employee>>({});
  const [updatedImage, setUpdatedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    async function fetchEmployee() {
      try {
        const response = await fetch(`/api/employee/${encodeURIComponent(id)}`);
        if (!response.ok) throw new Error("Failed to fetch employee details");
        const data: Employee = await response.json();
        setEmployee(data);
      } catch (err: unknown) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchEmployee();
  }, [id]);

  const handleUpdate = (field: string, value: string) => {
    setEmployee(prev => (prev ? { ...prev, [field]: value } : null));
    setUpdatedFields(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setUpdatedImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const saveChanges = async () => {
    try {
      let newPhotoURL = employee?.photoURL;
      let newPublicId = employee?.photoPublicId;

      if (selectedFile) {
        console.log("📸 Uploading new image...");

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("employeeId", id);
        if (employee?.photoPublicId) {
          formData.append("oldPublicId", employee.photoPublicId);
        }

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(`Image upload failed: ${errorData.error}`);
        }

        const uploadData = await uploadResponse.json();
        console.log("✅ Image uploaded successfully:", uploadData);

        newPhotoURL = uploadData.secure_url;
        newPublicId = uploadData.public_id;
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

      console.log("🔄 Sending update payload:", updatePayload);

      const updateResponse = await fetch(
        `/api/employee/${encodeURIComponent(id)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatePayload),
        }
      );

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        throw new Error(`Update failed: ${errorData.error}`);
      }

      const updatedEmployee: Employee = await updateResponse.json();
      setEmployee(updatedEmployee);
      setUpdatedFields({});
      setUpdatedImage(null);
      setSelectedFile(null);
      alert("Profile updated successfully!");
      router.push(`/employees/${id}`);
    } catch (err: unknown) {
      console.error("❌ Error saving changes:", err);
      alert("Error updating profile.");
    }
  };

  const handleDocumentChange = (field: string, file: File) => {
    setSelectedFile(file);
    setUpdatedFields(prev => ({ ...prev, [field]: file }));
  };

  const updateDocument = async (field: keyof Employee) => {
    if (!selectedFile) {
      alert("Please select a file before updating.");
      return;
    }

    try {
      console.log(`📤 Uploading ${field}...`);

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || "default_preset"
      );

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      if (!uploadResponse.ok) throw new Error("Upload failed");

      const data = await uploadResponse.json();
      const updatedFileURL = data.secure_url;

      const updateResponse = await fetch(`/api/employee/${employee!.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: updatedFileURL }),
      });

      if (!updateResponse.ok) throw new Error("Document update failed");

      alert(`${field} updated successfully!`);
      window.location.reload();
    } catch (error: unknown) {
      console.error(`Error updating ${field}:`, error);
      alert("Failed to update document.");
    }
  };

  return {
    employee,
    loading,
    error,
    handleUpdate,
    saveChanges,
    handleImageChange,
    updatedImage,
    updateDocument,
    handleDocumentChange,
  };
}