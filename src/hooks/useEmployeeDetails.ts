// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store";
// import { fetchEmployeeById, updateEmployeeDetails } from "@/redux/slice/employeeDetailsSlice";

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

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function useEmployeeDetails(id: string) {
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedFields, setUpdatedFields] = useState<Partial<any>>({}); // Track edited fields
  const router = useRouter();
  useEffect(() => {
    async function fetchEmployee() {
      try {
        const response = await fetch(`/api/employee/${encodeURIComponent(id)}`);
        if (!response.ok) throw new Error("Failed to fetch employee details");
        const data = await response.json();
        setEmployee(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchEmployee();
  }, [id]);

  const handleUpdate = (field: string, value: string) => {
    setEmployee((prev) => ({ ...prev, [field]: value })); // Update UI optimistically
    setUpdatedFields((prev) => ({ ...prev, [field]: value })); // Track changes
  };

  const saveChanges = async () => {
    if (!Object.keys(updatedFields).length) {
      alert("No changes to update");
      return;
    }

    try {
      const response = await fetch(`/api/employee/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields), // Only send updated fields
      });

      if (!response.ok) throw new Error("Failed to update employee details");

      const updatedEmployee = await response.json();
      setEmployee(updatedEmployee);
      setUpdatedFields({}); // Reset after successful update
      alert("Employee details updated successfully!");
      router.push(`/employees/${id}`);
    } catch (err: any) {
      setError(err.message);
      alert("Error updating employee details");
    }
  };

  return { employee, loading, error, handleUpdate, saveChanges };
}
