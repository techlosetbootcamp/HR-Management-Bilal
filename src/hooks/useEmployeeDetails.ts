import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface Employee {
  id: string;
  firstName?: string;
  lastName: string;
  email: string;
  department: string;
  designation: string;
  dateOfBirth: string;
  zipCode: string;
  state: string;
  city: string;
  gender: string;
  mobileNumber: string;
  photoURL?: string;
  salarySlip?: string;
  address: string;
  maritalStatus: string;
  nationality: string;
  employeeId: string;
  userName: string;
  employmentType: string;
  status: string;
  workingDays: string;
  joiningDate: string;
  officeLocation: string;
  [key: string]: string | File | undefined;
  photoPublicId?: string;
  slackId: string;
  skypeId: string;
  githubId: string;
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
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || "default_preset");
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
    if (!updatePayload || Object.keys(updatePayload).length === 0) {
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
    if (!file || file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }
    setSelectedFile(file);
    setUpdatedFields(prev => ({ ...prev, [field]: file }));
  };

  const updateDocument = async (field: keyof Employee) => {
    if (!selectedFile) {
      alert("Please select a file before updating.");
      return;
    }
  
    try {
      console.log(`📤 Uploading document for field: ${field}...`);
  
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || "default_preset"
      );
      formData.append("resource_type", "raw"); // Ensure non-image upload
  
      // ✅ Upload file to Cloudinary first
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        { method: "POST", body: formData }
      );
  
      if (!uploadResponse.ok) {
        console.error("❌ Upload failed:", uploadResponse.status);
        throw new Error("Upload failed");
      }
  
      const data = await uploadResponse.json();
      console.log("✅ Cloudinary Upload Response:", data);
  
      if (!data || !data.secure_url) {
        console.error("❌ Missing secure_url in Cloudinary response:", data);
        throw new Error("Cloudinary upload failed: No secure_url received");
      }
  
      const updatedFileURL = data.secure_url;
  
      console.log(`🔄 Updating employee document field: ${field}`);
  
      const updatePayload: Partial<Employee> = { [field]: updatedFileURL }; // ✅ Send URL instead of File
  
      console.log("📨 Sending update request with payload:", updatePayload);
  
      // ✅ Send PATCH request with file URL (NOT the file itself)
      const updateResponse = await fetch(`/api/employee/${encodeURIComponent(employee!.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload),
      });
  
      if (!updateResponse.ok) {
        let errorData;
        try {
          errorData = await updateResponse.json();
        } catch (jsonError) {
          console.error("❌ Error parsing update API response:", jsonError);
          throw new Error("Invalid JSON response from update API");
        }
        console.error("❌ Update request failed:", errorData);
        throw new Error("Document update failed");
      }
  
      alert(`${field} updated successfully!`);
      window.location.reload();
    } catch (error: unknown) {
      console.error(`❌ Error updating ${field}:`, error);
      alert("Failed to update document. Check the console for details.");
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
