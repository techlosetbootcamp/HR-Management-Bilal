"use client";
import { useState, useEffect } from "react";
import {  useSelector } from "react-redux";
import {  RootState, useAppDispatch } from "@/redux/store";
import { fetchAttendance } from "@/redux/slice/attandanceSlice";

export const useAttendanceOverview = (
  searchTerm: string = "",
  showPagination: boolean = false
) => {
  const dispatch = useAppDispatch();
  const attendanceRecords = useSelector(
    (state: RootState) => state.attandance.attendanceRecords
  );
  const loading = useSelector((state: RootState) => state.attandance.loading);
  const error = useSelector((state: RootState) => state.attandance.error);

  useEffect(() => {
    dispatch(fetchAttendance());
  }, [dispatch]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const filteredRecords = attendanceRecords.filter((record) => {
    const fullName =
      `${record.employee.firstName} ${record.employee.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const totalItems = filteredRecords.length;
  const recordsToShow = showPagination
    ? filteredRecords.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : filteredRecords;

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
