"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface AttendanceData {
  day: string;
  onTime: number;
  late: number;
  absent: number;
}

const AttendanceChart = () => {
  const [data, setData] = useState<AttendanceData[]>([]);

  useEffect(() => {
    fetch("/api/attendance")
      .then((res) => res.json())
      .then((attendanceRecords) => {
        // Transform data for Recharts
        const groupedData: { [key: string]: AttendanceData } = {};

        attendanceRecords.forEach((record: { date: string; status: string }) => {
          const day = new Date(record.date).toLocaleDateString("en-US", {
            weekday: "short",
          });

          if (!groupedData[day]) {
            groupedData[day] = { day, onTime: 0, late: 0, absent: 0 };
          }

          if (record.status === "ON_TIME") groupedData[day].onTime++;
          if (record.status === "LATE") groupedData[day].late++;
          if (record.status === "ABSENT") groupedData[day].absent++;
        });

        setData(Object.values(groupedData));
      })
      .catch((error) =>
        console.error("Error fetching attendance data:", error)
      );
  }, []);

  return (
    <div className="w-full h-96 p-4 bg-gray-900 rounded-lg">
      <h2 className="text-lg font-semibold text-white mb-4">
        Attendance Overview
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          barCategoryGap="15%" // Increase space between bars
          barGap={-15} // Makes stacked bars look like separate segments
        >
          <XAxis dataKey="day" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip />
          <Bar
            dataKey="onTime"
            stackId="a"
            fill="#E25319"
            radius={[15, 15, 25, 25]}
            barSize={15}
          />
          <Bar
            dataKey="late"
            stackId="a"
            fill="#F45B69"
            radius={[15, 15, 25, 25]}
            barSize={15}
          />
          <Bar
            dataKey="absent"
            stackId="a"
            fill="#FEB85B"
            radius={[15, 15, 25, 25]}
            barSize={35}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
