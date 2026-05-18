import React, { useState } from "react";
import { updateJobStatus, deleteJob } from "../../services/jobsApi.js";
import toast from "react-hot-toast";

function JobsList({
  jobs,
  fetchDashboardData,
  setEditJob,
  setJobModal,
  searchTerm,
  statusFilter,
}) {
  const handleStatusChange = async (jobId, status) => {
    try {
      await updateJobStatus(jobId, status);

      // setStatusFilter("ALL");
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

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = `${job.company} ${job.role}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const displayJobs = showAllJobs ? filteredJobs : filteredJobs.slice(0, 3);

  return (
    <div className="bg-white/10 border border-white/10 rounded-2xl p-6 mt-8 shadow-2xl">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-2xl font-semibold">Recent Applications</h3>
        <button
          className="px-4 py-2 border border-black/30 hover:bg-black/10 dark:border-white/30 rounded-lg dark:hover:bg-white/10 duration-300 hover:scale-105"
          onClick={() => setShowAllJobs(!showAllJobs)}
        >
          {showAllJobs ? "Show less " : "View all"}
        </button>
      </div>

      <div className="space-y-4">
        {displayJobs.map((job) => (
          <div
            className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-black/60 dark:hover:border-white/60 w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 lg:gap-0 lg:justify-between lg:items-center shadow-lg dark:shadow-lg"
            key={job.id}
          >
            {job.role} - {job.company}
            <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6">
              <select
                value={job.status}
                onChange={(e) => handleStatusChange(job.id, e.target.value)}
                className="bg-black dark:bg-white border border-white/20 dark:bg-border-bla
                /20 rounded-lg px-2 sm:px-3 py-2 text-sm sm:text-base text-white dark:text-black outline-none sm:w-auto"
              >
                <option value="APPLIED" className="bg-black text-white">
                  APPLIED
                </option>

                <option value="INTERVIEW" className="bg-black text-white">
                  INTERVIEW
                </option>

                <option value="OFFER" className="bg-black text-white">
                  OFFER
                </option>

                <option value="REJECTED" className="bg-black text-white">
                  REJECTED
                </option>
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
        {displayJobs.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            No jobs added yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default JobsList;
