"use client";
import React from "react";
import EmployeeInput from "@/components/employeeInput/EmployeeInput";
import { useProjects } from "./useProjects";

export default function AdminProjects() {
  const {
    projects,
    projectLoading,
    projectError,
    employees,
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
    isModalOpen,
    setIsModalOpen,
    handleSubmit,
  } = useProjects();

  return (
    <div className="p-6">
      <div className="flex justify-between">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Admin Projects
      </h1>
      
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Add Project
      </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-md w-full z-10">
            <h2 className="text-xl font-semibold mb-4">New Project</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <EmployeeInput
                label="Project Title"
                name="title"
                value={title}
                placeholder="Enter project title"
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                  if (e.target instanceof HTMLInputElement) {
                    setTitle(e.target.value);
                  }
                }}
                required
              />

              <textarea
                placeholder="Project Description"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
                }
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 text-white"
              />

              <EmployeeInput
                label="Start Date"
                type="date"
                name="startDate"
                value={startDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                  if (e.target instanceof HTMLInputElement) {
                    setStartDate(e.target.value);
                  }
                }}
                required
              />

              <EmployeeInput
                label="End Date"
                type="date"
                name="endDate"
                value={endDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                  if (e.target instanceof HTMLInputElement) {
                    setEndDate(e.target.value);
                  }
                }}
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
                  onClick={() => setIsModalOpen(false)}
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
          </div>
        </div>
      )}

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-200">
        Projects List
      </h2>
      {projectLoading && <p>Loading projects...</p>}
      {projectError && <p className="text-red-500">{projectError}</p>}
      {!projectLoading && projects.length === 0 && <p>No projects found.</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-50 dark:bg-gray-800 border-collapse">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Project Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Employee Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {projects.map((project) => {
              const employee = employees.find(
                (emp) => emp.id === project.assignedEmployeeId
              );
              return (
                <tr
                  key={project.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {project.title}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {employee ? `${employee.firstName} ${employee.lastName}` : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {new Date(project.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {new Date(project.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {project.status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
