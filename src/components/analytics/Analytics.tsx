"use client";

import { useEffect, useState } from "react";
import { Users, CalendarCheck, Briefcase, FileText } from "lucide-react";

const Analytics = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [applicantCount, setApplicantCount] = useState(0);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [updateDates, setUpdateDates] = useState({
    employees: "",
    applicants: "",
    attendance: "",
    projects: "",
  });

  useEffect(() => {
    // ✅ Fetch Employees Count
    fetch("/api/employee")
  .then((res) => res.json())
  .then((data) => {
    console.log("Employees API Response:", data); // ✅ Debugging log
    setEmployeeCount(data.length || 0);
    setUpdateDates((prev) => ({ ...prev, employees: "July 16, 2023" })); // Replace with actual date
  })

    // ✅ Fetch Attendance Records for Today
    fetch("/api/attendance")
      .then((res) => res.json())
      .then((data) => {
        const today = new Date().toISOString().split("T")[0];
        const todayAttendance = data.filter((a: { date: string }) => a.date.startsWith(today)).length;
        setAttendanceCount(todayAttendance);
        setUpdateDates((prev) => ({ ...prev, attendance: "July 14, 2023" })); // Replace with actual date
      });

    // ✅ Fetch Applicants
    fetch("/api/applicants")
      .then((res) => res.json())
      .then((data) => {
        setApplicantCount(data.length);
        setUpdateDates((prev) => ({ ...prev, applicants: "July 14, 2023" })); // Replace with actual date
      });

    // ✅ Fetch Projects
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjectCount(data.length);
        setUpdateDates((prev) => ({ ...prev, projects: "July 10, 2023" })); // Replace with actual date
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Total Employees */}
      <StatCard
        icon={<Users size={25} className="text-orange-500" />}
        title="Total Employee"
        count={employeeCount}
        updateDate={updateDates.employees}
        percentage={12}
      />

      {/* Total Applicants */}
      <StatCard
        icon={<Briefcase size={25} className="text-orange-500" />}
        title="Total Applicant"
        count={applicantCount}
        updateDate={updateDates.applicants}
        percentage={5}
      />

      {/* Today Attendance */}
      <StatCard
        icon={<CalendarCheck size={25} className="text-orange-500" />}
        title="Today Attendance"
        count={attendanceCount}
        updateDate={updateDates.attendance}
        percentage={-8}
      />

      {/* Total Projects */}
      <StatCard
        icon={<FileText size={25} className="text-orange-500" />}
        title="Total Projects"
        count={projectCount}
        updateDate={updateDates.projects}
        percentage={12}
      />
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  updateDate: string;
  percentage: number;
}

const StatCard = ({ icon, title, count, updateDate, percentage }: StatCardProps) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md flex flex-col justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gray-800 rounded-md">{icon}</div>
        <h3 className="text-white text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-4xl font-bold text-white mt-3">{count}</p>
      <div className="flex justify-between items-center mt-3">
        <p className="text-gray-400 text-sm">Update: {updateDate}</p>
        <div
          className={`text-sm px-2 py-1 rounded-md ${
            percentage >= 0 ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {percentage >= 0 ? `▲ ${percentage}%` : `▼ ${Math.abs(percentage)}%`}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
