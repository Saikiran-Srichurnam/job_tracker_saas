import React from "react";
import {
  BriefcaseBusiness,
  CircleDashed,
  BadgeCheck,
  XCircle,
} from "lucide-react";

function StatsCards({ jobsData }) {
  const stats = [
    {
      title: "Applications",
      value: jobsData?.totalJobsCount || 0,
      icon: <BriefcaseBusiness size={28} />,
    },
    {
      title: "Interviews",
      value: jobsData?.interviewJobsCount || 0,
      icon: <CircleDashed size={28} />,
    },
    {
      title: "Offers",
      value: jobsData?.offerJobsCount || 0,
      icon: <BadgeCheck size={28} />,
    },
    {
      title: "Rejected",
      value: jobsData?.rejectedJobsCount || 0,
      icon: <XCircle size={28} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {item.title}
              </p>

              <h3 className="text-4xl font-bold mt-3">
                {item.value}
              </h3>
            </div>

            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl text-slate-700 dark:text-white">
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;