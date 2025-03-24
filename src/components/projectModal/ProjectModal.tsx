"use client";
import React from "react";
import { motion } from "framer-motion";
import EmployeeInput from "@/components/employeeInput/EmployeeInput";
import { ProjectModalProps } from "@/types/projects";

export default function ProjectModal({
  isOpen,
  onClose,
  title,
  setTitle,
  description,
  setDescription,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  employeeId,
  setEmployeeId,
  employees,
  handleSubmit,
}: ProjectModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
      ></motion.div>

      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-md w-full z-10"
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <h2 className="text-xl font-semibold mb-4">New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <EmployeeInput
            label="Project Title"
            name="title"
            value={title}
            placeholder="Enter project title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 text-white"
          />

          <EmployeeInput
            label="Start Date"
            type="date"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />

          <EmployeeInput
            label="End Date"
            type="date"
            name="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />

          <div className="flex flex-col">
            <label className="text-sm text-gray-400 mb-1">
              Select Employee
            </label>
            <select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
              className="border p-2 rounded-xl w-full dark:bg-[#131313] text-white border-gray-700 h-[56px]"
            >
              <option value="" disabled>
                Select an Employee
              </option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Save Project
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
