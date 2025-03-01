"use client";
import React, { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useDispatch } from "react-redux";
import { setFilters } from "@/redux/slice/employeeSlice";

const FilterComponent = () => {
  const dispatch = useDispatch();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setLocalFilters] = useState({
    department: "",
    designation: "",
    city: "",
  });

  // Predefined City List
  const predefinedCities = [
    "Faisalabad",
    "Lahore",
    "Rawalpindi",
    "Islamabad",
    "Karachi",
    "Multan",
  ];

  // Corrected Designation List
  const designations = [
    "UI/X Designer",
    "PHP Developer",
    "HR Executive",
    "Project Manager",
    "Sales Manager",
    "Next.js Developer",
    "Node.js Developer",
    "Design Lead",
  ];

  // Corrected Department List (Removed Duplicate)
  const departments = ["Design", "Development", "HR", "PM", "Sales"];

  // Handle Filter Change
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply Filters
  const applyFilters = () => {
    dispatch(setFilters(filters));
    setShowFilters(false); // Hide dropdown after applying filters
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="border-gray-200 hover:border-customOrange ease-in-out duration-300 hover:text-customOrange border-[1px] flex items-center ms-5 rounded-[10px] px-[22.5px] dark:border-gray-700"
      >
        <SlidersHorizontal />
        <div className="ml-[10px] text-[16px]">Filter</div>
      </button>

      {showFilters && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 z-50">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            Filter Employees
          </h3>

          {/* Department Filter */}
          <select
            name="department"
            value={filters.department}
            onChange={handleFilterChange}
            className="w-full p-2 mb-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded"
          >
            <option value="">All Departments</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>

          {/* Designation Filter */}
          <select
            name="designation"
            value={filters.designation}
            onChange={handleFilterChange}
            className="w-full p-2 mb-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded"
          >
            <option value="">All Designations</option>
            {designations.map((designation) => (
              <option key={designation} value={designation}>
                {designation}
              </option>
            ))}
          </select>

          {/* City Filter */}
          <select
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            className="w-full p-2 mb-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded"
          >
            <option value="">All Cities</option>
            {predefinedCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          {/* Apply Button */}
          <button
            onClick={applyFilters}
            className="w-full bg-customOrange text-white py-2 rounded mt-2"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
