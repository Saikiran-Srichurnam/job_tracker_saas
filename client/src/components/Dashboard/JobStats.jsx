import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTheme } from "../../context/ThemeContext.jsx";

function JobStats({ jobsData }) {
  const { darkMode } = useTheme();

  const data = [
    {
      name: "Applied",
      value: jobsData?.totalJobsCount || 0,
      color: "#3B82F6", // blue
    },
    {
      name: "Interview",
      value: jobsData?.interviewJobsCount || 0,
      color: "#F59E0B", // amber
    },
    {
      name: "Offers",
      value: jobsData?.offerJobsCount || 0,
      color: "#10B981", // emerald
    },
    {
      name: "Rejected",
      value: jobsData?.rejectedJobsCount || 0,
      color: "#EF4444", // red
    },
  ];

  return (
    <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-3xl p-6 mt-8 shadow-xl transition-all duration-300">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-black dark:text-white">
          Application Analytics
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
          Visual overview of your application progress.
        </p>
      </div>

      {/* CHART */}
      <div className="bg-white/60 dark:bg-slate-900/60 border border-black/10 dark:border-white/10 rounded-2xl p-4 h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: -10,
              bottom: 10,
            }}
          >
            <XAxis
              dataKey="name"
              tick={{
                fill: darkMode ? "#CBD5E1" : "#374151",
                fontSize: 13,
                fontWeight: 600,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: darkMode ? "#CBD5E1" : "#374151",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                backgroundColor: darkMode ? "#0f172a" : "#ffffff",
                border: darkMode
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(0,0,0,0.1)",
                borderRadius: "12px",
                color: darkMode ? "#ffffff" : "#000000",
              }}
              labelStyle={{
                color: darkMode ? "#ffffff" : "#000000",
                fontWeight: 600,
              }}
              itemStyle={{
                color: darkMode ? "#ffffff" : "#000000",
              }}
            />

            <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={50}>
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default JobStats;
