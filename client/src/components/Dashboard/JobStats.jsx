import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../context/ThemeContext.jsx";

function JobsChart({ jobsData }) {
  const { darkMode } = useTheme();

  const data = [
    {
      name: "Applied",
      value: jobsData?.totalJobsCount || 0,
    },
    {
      name: "Interview",
      value: jobsData?.interviewJobsCount || 0,
    },
    {
      name: "Offers",
      value: jobsData?.offerJobsCount || 0,
    },
    {
      name: "Rejected",
      value: jobsData?.rejectedJobsCount || 0,
    },
  ];

  return (
    <div className="bg-white/10 border border-white/10 rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">Application Analytics</h2>

      <div className="bg-black/5 dark:bg-white/10 p-6 rounded-2xl shadow-xl border border-white/10 w-full h-[350px] flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: -20, bottom: 20 }}
            style={{ outline: "none" }}
            activeBar={false}
          >
            <XAxis
              dataKey="name"
              interval={0}
              tick={{
                fontSize: 12,
                fill: darkMode ? "#fff" : "#000",
                fontWeight: 600,
              }}
            />
            <YAxis
              tick={{
                fontSize: 12,
                fill: darkMode ? "#fff" : "#000",
                fontWeight: 600,
              }}
            />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default JobsChart;
