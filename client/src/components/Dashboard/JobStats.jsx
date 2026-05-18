import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function JobsChart({ jobsData }) {
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
      <h2 className="text-2xl font-bold mb-6">
        Application Analytics
      </h2>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default JobsChart;