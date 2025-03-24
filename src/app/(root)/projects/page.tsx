"use client";
import React from "react";
import Button from "@/components/button/Button";
import ProjectModal from "@/components/projectModal/ProjectModal";
import { useProjects } from "./useProjects";
import { useProjectModal } from "@/components/projectModal/useProjectModal";
import ProjectList from "@/components/projectList/ProjectList";

export default function Page() {
  const {
    projects,
    projectLoading,
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
    handleSubmit,
  } = useProjects();

  const { isModalOpen, openModal, closeModal } = useProjectModal();

  return (
    <div className="p-6 border dark:border-gray-700 rounded-xl">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Admin Projects
        </h1>
        <div>
          <Button onClick={openModal}>Add Project</Button>
        </div>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        employeeId={employeeId}
        setEmployeeId={setEmployeeId}
        employees={employees}
        handleSubmit={handleSubmit}
      />

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
        Projects List
      </h2>

      <ProjectList
        projects={projects}
        employees={employees}
        loading={projectLoading}
        showEmployeeName={true}
        showActionButton={false}
      />
    </div>
  );
}
