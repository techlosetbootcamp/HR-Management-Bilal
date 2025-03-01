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

  const predefinedCities = [
    "Faisalabad",
    "Lahore",
    "Rawalpindi",
    "Islamabad",
    "Karachi",
    "Multan",
  ];

  const designations = [
    "UI/U Designer",
    "PHP Developer",
    "HR Executive",
    "Project Manager",
    "Sales Manager",
    "Next.js Developer",
    "Node.js Developer",
    "Design Lead",
  ];

  const departments = ["Design", "Development", "HR", "PM", "Sales"];

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    dispatch(setFilters(filters));
    setShowFilters(false); // Hide dropdown after applying filters
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="border-[1px] border-gray-300 dark:border-gray-600 bg-white dark:bg-[#131313] text-gray-900 dark:text-white flex items-center rounded-lg px-6 py-3 mr-3 mt-3"
      >
        <div className="hover:text-customOrange flex transition-all duration-300 ease-in-out">
        <SlidersHorizontal size={24} className=""/>
        <span className="ml-3 text-[16px] font-[300]">Filter</span>
        </div>
      </button>

      {showFilters && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#222121] shadow-lg rounded-lg p-4 z-50">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            Filter Employees
          </h3>

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
