"use client";
import React from "react";
import LottieAnimation from "../lottieAnimation/LottieAnimation";
import { ProjectListProps } from "@/types/projects";

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
      <table className="min-w-full dark:bg-[#131313] border-collapse">
        <thead className="text-left text-xs uppercase tracking-wider">
          <tr>
            <th className="p-4">Project Title</th>
            {showEmployeeName && <th className="p-4">Employee Name</th>}
            <th className="p-4">Start Date</th>
            <th className="p-4">End Date</th>
            <th className="p-4">Status</th>
            {showActionButton && <th className="p-4">Actions</th>}
          </tr>
        </thead>
        <tbody className="">
          {projects.map((project) => {
            const employee = employees.find(
              (emp) => emp.id === project.assignedEmployeeId
            );

            const statusColor =
              project.status === "COMPLETED"
                ? "text-green-500"
                : project.status === "IN_PROGRESS"
                ? "customOrange"
                : "";

            return (
              <tr key={project.id} className="">
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
                <td className={`p-4 ${statusColor}`}>{project.status}</td>
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
