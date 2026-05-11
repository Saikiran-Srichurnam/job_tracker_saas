import React, { useEffect, useState } from "react";
import { getAllJobs } from "../../services/jobsApi";

function JobsList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await getAllJobs();
        console.log(res);
        setJobs(res.data.jobs);
      } catch (error) {
        console.log(error.message);
        return;
      }
    };
    fetchAllJobs();
  }, []);
  return (
    <div className="bg-white/10 border border-white/10 rounded-2xl p-6 mt-8 shadow-2xl">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-2xl font-semibold">Recent Applications</h3>
        <button className="px-4 py-2 bg-white text-slate-900 rounded-lg font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:duration-300 hover:bg-white/30"
            key={job.id}
          >
            {job.role} - {job.company}
          </div>
        ))}

        {/* <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              React Engineer - Microsoft
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              UI Developer - Amazon
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              MERN Developer - Netflix
            </div> */}
      </div>
    </div>
  );
}

export default JobsList;
