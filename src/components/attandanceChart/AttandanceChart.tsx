"use client";
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useAttandanceChart } from "./useAttandanceChart";
import { Loader } from "lucide-react";

const AttendanceChart = () => {
  const { data, loading, error } = useAttandanceChart();

  if (loading)
    return (
      <>
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      </>
    );
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full h-96 p-4 bg-gray-900 rounded-lg">
      <h2 className="text-lg font-semibold text-white mb-4">
        Attendance Overview
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap="15%" barGap={-15}>
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
