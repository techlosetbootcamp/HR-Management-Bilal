"use client";
import React from "react";
import LottieAnimation from "../lottieAnimation/LottieAnimation";

interface Project {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
  assignedEmployeeId: string;
}

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
}

interface ProjectListProps {
  projects: Project[];
  employees: Employee[];
  loading?: boolean;
  error?: string;
  onCompleteProject?: (projectId: string) => void;
  showEmployeeName?: boolean;
  showActionButton?: boolean;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  employees,
  loading,
  error,
  onCompleteProject,
  showEmployeeName = false,
  showActionButton = true,
}) => {
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen dark:bg-[#131313]">
        <LottieAnimation />
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;
  if (!loading && projects.length === 0) return <p>No projects found.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-50 dark:bg-[#131313] border-collapse">
        <thead className="bg-gray-200 dark:bg-gray-700 text-left text-xs uppercase tracking-wider">
          <tr>
            <th className="p-4">Project Title</th>
            {showEmployeeName && <th className="p-4">Employee Name</th>}
            <th className="p-4">Start Date</th>
            <th className="p-4">End Date</th>
            <th className="p-4">Status</th>
            {showActionButton && <th className="p-4">Actions</th>}
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
                <td className="p-4">{project.title}</td>
                {showEmployeeName && (
                  <td className="p-4">
                    {employee
                      ? `${employee.firstName} ${employee.lastName}`
                      : "N/A"}
                  </td>
                )}
                <td className="p-4">
                  {new Date(project.startDate).toLocaleDateString()}
                </td>
                <td className="p-4">
                  {new Date(project.endDate).toLocaleDateString()}
                </td>
                <td className="p-4">{project.status}</td>
                {showActionButton && project.status !== "COMPLETED" && (
                  <td className="p-4">
                    <button
                      onClick={() =>
                        onCompleteProject && onCompleteProject(project.id)
                      }
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Complete
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
