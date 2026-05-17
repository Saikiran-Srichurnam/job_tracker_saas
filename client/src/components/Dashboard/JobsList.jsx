import React, { useState } from "react";
import { updateJobStatus, deleteJob } from "../../services/jobsApi.js";
import toast from "react-hot-toast";

function JobsList({ jobs, fetchDashboardData, setEditJob, setJobModal }) {
  const handleStatusChange = async (jobId, status) => {
    try {
      await updateJobStatus(jobId, status);

      await fetchDashboardData();
      toast.success("Status Updated");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const res = await deleteJob(jobId);
      console.log(res);

      await fetchDashboardData();
      toast.success("Job Deleted");
    } catch (error) {
      console.log(error.message);
      toast.error("Delete failed");
      return error;
    }
  };

  // show only first three jobs view button functionality
  const [showAllJobs, setShowAllJobs] = useState(false);

  const displayJobs = showAllJobs ? jobs : jobs.slice(0, 3);

  return (
    <div className="bg-white/10 border border-white/10 rounded-2xl p-6 mt-8 shadow-2xl">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-2xl font-semibold">Recent Applications</h3>
        <button
          className="px-4 py-2 bg-white text-slate-900 rounded-lg font-medium"
          onClick={() => setShowAllJobs(!showAllJobs)}
        >
          {showAllJobs ? "Show less " : "View all"}
        </button>
      </div>

      <div className="space-y-4">
        {displayJobs.map((job) => (
          <div
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/60 w-full flex flex-col lg:flex-row gap-4 lg:gap-0 lg:justify-between lg:items-center"
            key={job.id}
          >
            {job.role} - {job.company}
            <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6">
              <select
                value={job.status}
                onChange={(e) => handleStatusChange(job.id, e.target.value)}
                className="bg-black/40 border border-white/20 rounded-lg px-2 sm:px-3 py-2 text-sm sm:text-base text-white outline-none w-full sm:w-auto"
              >
                <option value="APPLIED">APPLIED</option>
                <option value="INTERVIEW">INTERVIEW</option>
                <option value="OFFER">OFFER</option>
                <option value="REJECTED">REJECTED</option>
              </select>
              <button
                className="hover:cursor-pointer px-4 py-2 hover:bg-blue-500/20 bg-gray-500/20 text-blue-300 rounded-lg transition duration-300 border border-gray-400/30 text-sm font-semibold backdrop-blur-md hover:text-blue-500"
                onClick={() => {
                  setEditJob(job);
                  setJobModal(true);

                  document.body.style.overflow = "hidden";
                }}
              >
                ✏️
              </button>
              <button
                className="hover:cursor-pointer px-4 py-2 hover:bg-red-500/20 bg-red-500/5 text-red-300 hover:text-white rounded-lg transition duration-300 border border-red-400/30 text-sm font-semibold backdrop-blur-md"
                onClick={() => {
                  const confirmDelete = window.confirm(
                    "Are you sure you want to delete this job?",
                  );

                  if (confirmDelete) {
                    handleDeleteJob(job.id);
                  }
                }}
              >
                ❌
              </button>
            </div>
          </div>
        ))}
        {jobs.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            No jobs added yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default JobsList;
