"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchAttendance } from "@/redux/slice/attandanceSlice";

export const useAttendanceOverview = (
  searchTerm: string = "",
  showPagination: boolean = false
) => {
  const dispatch = useDispatch<AppDispatch>();
  const attendanceRecords = useSelector(
    (state: RootState) => state.attandance.attendanceRecords
  );
  const loading = useSelector((state: RootState) => state.attandance.loading);
  const error = useSelector((state: RootState) => state.attandance.error);

  useEffect(() => {
    dispatch(fetchAttendance());
  }, [dispatch]);

  // Format date helper.
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  // Filter records based on the search term.
  const filteredRecords = attendanceRecords.filter((record) => {
    const fullName =
      `${record.employee.firstName} ${record.employee.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  // Pagination state and logic.
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const totalItems = filteredRecords.length;
  const recordsToShow = showPagination
    ? filteredRecords.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : filteredRecords;

  // Reset pagination to first page when search term changes.
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return {
    attendanceRecords: recordsToShow,
    totalItems,
    loading,
    error,
    formatDate,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
  };
};
