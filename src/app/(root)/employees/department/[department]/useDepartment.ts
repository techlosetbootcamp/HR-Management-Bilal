import { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { fetchEmployees, deleteEmployee } from "@/redux/slice/employeeSlice";
import { useSession } from "next-auth/react";

const useEmployees = (departmentName: string) => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const router = useRouter();
  const { employees, error, loading } = useAppSelector(
    (state: RootState) => state.employees
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };
  const handleDeleteEmployee = (id: string) => {
    dispatch(deleteEmployee(id))
      .unwrap()
      .then(() => {
        console.log("Employee deleted successfully");
      })
      .catch((error) => {
        console.error("Failed to delete employee:", error);
      });
  };

  const handleViewEmployee = (id: string) => {
    router.replace(`/employees/${id}`);
  };
  const handleEditEmployee = (id: string) => {
    router.replace(`/employees/${id}?edit=true`);
  };
  const departmentEmployees = employees?.filter(
    (emp) => emp?.department === departmentName
  );
  const filteredEmployees = departmentEmployees?.filter(
    (emp) =>
      (`${emp?.firstName} ${emp?.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        emp?.employeeId?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCity === "" || emp?.city === selectedCity)
  );
  const uniqueCities = departmentEmployees.length
    ? [...new Set(departmentEmployees?.map((emp) => emp?.city).filter(Boolean))]
    : [];

  return {
    employees: filteredEmployees,
    loading,
    error,
    searchTerm,
    selectedCity,
    isFilterOpen,
    uniqueCities,
    setIsFilterOpen,
    handleSearchChange,
    handleCityChange,
    handleDeleteEmployee,
    handleViewEmployee,
    handleEditEmployee,
    isAdmin,
  };
};

export default useEmployees;
