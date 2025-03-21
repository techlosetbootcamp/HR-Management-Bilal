import { fetchAttendance } from "@/redux/slice/attandanceSlice";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/redux/store";

const useAttendance = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { attendanceRecords, loading, error } = useSelector(
    (state: RootState) => state.attandance
  );

  useEffect(() => {
    dispatch(fetchAttendance());
  }, [dispatch]);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredAttendance = attendanceRecords.filter((record) => {
    const fullName =
      `${record.employee.firstName} ${record.employee.lastName}`.toLowerCase();
    const email = record.employee.firstName.toLowerCase();
    const term = searchTerm.toLowerCase();
    return fullName.includes(term) || email.includes(term);
  });

  // Calculate indices for current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecords = filteredAttendance.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handler functions for pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (num: number) => {
    setItemsPerPage(num);
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };
  return {
    attendance: attendanceRecords,
    formatDate,
    loading,
    error,
    searchTerm,
    filteredAttendance,
    itemsPerPage,
    currentPage,
    handleItemsPerPageChange,
    handlePageChange,
    currentRecords,
    handleSearchChange
  };
};

export default useAttendance;
