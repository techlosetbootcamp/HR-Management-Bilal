"use client";

import { useProjectsRecord } from "./useProjectsRecord";

interface Employee {
  id: string;
}

interface EmployeeProjectsTableProps {
  employee: Employee;
}

export default function EmployeeProjectsTable({
  employee,
}: EmployeeProjectsTableProps) {
  const { projects, handleComplete, formatDate, calculateDuration } =
    useProjectsRecord(employee.id);

  return (
    <div className="overflow-x-auto bg-[#131313] text-white p-4 rounded-md">
      <h2 className="text-xl font-semibold mb-4">My Projects</h2>
      <table className="w-full text-left border-collapse">
        <thead className="border-b border-gray-600">
          <tr>
            <th className="pb-3">Title</th>
            <th className="pb-3">Start Date</th>
            <th className="pb-3">End Date</th>
            <th className="pb-3">Duration</th>
            <th className="pb-3">Status</th>
            <th className="pb-3"></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              className="border-b border-gray-700 hover:bg-[#2c2c2c]"
            >
              <td className="py-3">{project.title}</td>
              <td className="py-3">{formatDate(project.startDate)}</td>
              <td className="py-3">{formatDate(project.endDate)}</td>
              <td className="py-3">
                {calculateDuration(project.startDate, project.endDate)}
              </td>
              <td className="py-3">
                {project.status === "IN_PROGRESS" ? (
                  <span className="px-2 py-1 rounded bg-yellow-500 text-black">
                    In Progress
                  </span>
                ) : (
                  <span className="px-2 py-1 rounded bg-green-600 text-white">
                    Completed
                  </span>
                )}
              </td>
              <td className="py-3">
                {project.status === "IN_PROGRESS" && (
                  <button
                    onClick={() => handleComplete(project.id)}
                    className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Complete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
