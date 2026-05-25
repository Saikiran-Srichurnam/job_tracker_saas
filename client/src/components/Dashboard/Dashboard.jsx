import React, { useEffect, useState } from "react";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import StatsCards from "./StatsCards.jsx";
import JobsList from "./JobsList.jsx";
import AddJobModal from "./AddJobModal.jsx";
import { getAllJobs, getJobStats } from "../../services/jobsApi.js";
import { getCurrentUser } from "../../services/userApi.js";
import user from "../../images/user.png";
import JobsChart from "../Dashboard/JobStats.jsx";

function Dashboard() {
  const [jobsData, setJobsData] = useState({}); // used in Stats cards component
  const [jobs, setJobs] = useState([]); // used in Jobs list component
  const [companyName, setCompanyName] = useState(""); // used in Add job modal component
  const [roleName, setRoleName] = useState(""); // used in Add job modal component
  const [jobModal, setJobModal] = useState(false); // used in Add job modal component
  const [editJob, setEditJob] = useState(null); // used in Add job modal component
  const [viewProfile, setViewProfile] = useState(false); // used in Header component
  const [currentUserData, setCurrentUserData] = useState(null); // used in Header component
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await getAllJobs();
      const jobs = await getJobStats();
      console.log(res);
      setJobs(res.data.jobs);
      console.log(jobs);
      setJobsData(jobs.data);
    } catch (error) {
      console.log(error);
      return error.message;
    } finally {
      setLoading(false);
    }
  };
  const fetchCurrentUserData = async () => {
    try {
      const res = await getCurrentUser();
      console.log(res);
      setCurrentUserData(res.data);
    } catch (error) {
      console.log(error.message);
      return error;
    }
  };

  useEffect(() => {
    fetchCurrentUserData();
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl flex flex-col items-center">
          {/* Spinner */}
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-[6px] border-cyan-500/20"></div>
            <div className="absolute inset-0 rounded-full border-[6px] border-transparent border-t-cyan-400 animate-spin"></div>
          </div>
          {/* Text */}
          <h2 className="mt-6 text-2xl font-bold text-white tracking-wide">
            Loading Dashboard
          </h2>
          <p className="mt-2 text-gray-300 text-sm animate-pulse">
            Fetching your jobs and analytics...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 text-black dark:text-white flex flex-col transition-colors duration-300">
      {/* Header */}
      <Header
        setViewProfile={setViewProfile}
        currentUserData={currentUserData}
        setCurrentUserData={setCurrentUserData}
      />

      {/* view profile modal */}
      {viewProfile && (
        <div className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm flex justify-end w-full">
          <div className="w-full sm:w-96 min-h-screen overflow-y-auto bg-white dark:bg-slate-950 border-l border-black/10 dark:border-white/10 shadow-2xl p-6 flex flex-col text-black dark:text-white transition-colors duration-300">
            {/* Profile Header */}
            <div className="flex flex-col items-center text-center border-b border-black/10 dark:border-white/10 pb-6">
              <img
                src={user}
                alt="User"
                className="w-24 h-24 rounded-full object-cover bg-black/5 dark:bg-white/10 p-2 border border-black/10 dark:border-white/20"
              />

              <h2 className="text-2xl font-bold mt-4"></h2>

              <p className="text-black dark:text-white text-sm">
                Welcome back to{" "}
                <span className="text-xl font-semibold capitalize text-black dark:text-white">
                  {currentUserData?.name}
                </span>{" "}
                dashboard
              </p>
            </div>

            {/* Profile Stats */}
            <div className="mt-6 space-y-4 flex-grow mb-3">
              <div className="bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-700 rounded-xl shadow-lg border border-black/10 dark:border-white/40 p-4">
                <p className="text-gray-400 text-sm">Email</p>

                <h3 className="font-semibold mt-1">{currentUserData?.email}</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-700 rounded-xl shadow-lg border border-black/10 dark:border-white/40 p-4">
                  <p className="text-gray-400 text-sm">Applications</p>

                  <h3 className="text-2xl font-bold mt-1">
                    {jobsData?.totalJobsCount || 0}
                  </h3>
                </div>

                <div className="bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-700 rounded-xl shadow-lg border border-black/10 dark:border-white/40 p-4">
                  <p className="text-gray-400 text-sm">Interviews</p>

                  <h3 className="text-2xl font-bold mt-1">
                    {jobsData?.interviewJobsCount || 0}
                  </h3>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-700 rounded-xl shadow-lg border border-black/10 dark:border-white/40 p-5">
                <p className="text-sm text-gray-400">
                  Member Since
                </p>

                <h2 className="text-xl font-bold mt-2">
                  {new Date(currentUserData?.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </h2>

                <p className="text-sm mt-2 dark:text-white/80 text-black">
                  Tracking career growth with Job Tracker SaaS.
                </p>
              </div>
              <div className="bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-700 rounded-xl shadow-lg border border-black/10 dark:border-white/40 p-5">
                <h1>Next Interviews List</h1>
                {jobs &&
                  jobs
                    ?.filter((job) => job.status === "INTERVIEW")
                    .map((job) => (
                      <div
                        key={job.id}
                        className="bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-lg p-3 text-black dark:text-white mt-3"
                      >
                        <h2 className="font-semibold text-sm text-gray-600 dark:text-gray-300">
                          {job.company} -
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {job.role}
                          </span>
                        </h2>
                      </div>
                    ))}
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="space-y-3 pt-6 border-t border-white/10">
              <button
                onClick={() => {
                  setViewProfile(false);
                  document.body.style.overflow = "auto";
                }}
                className="w-full bg-red-500/20 hover:bg-red-500/80 text-red-600 dark:text-white transition-all duration-300 py-3 rounded-xl font-medium hover:scale-[1.02]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        {/* Hero Section */}
        <div className="bg-white/10 border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            Manage Your Career Journey Like a Pro
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm sm:text-base lg:text-lg">
            Track applications, interviews, offers, and progress with one
            premium dashboard.
          </p>
          {/* Add Job Button */}
          <AddJobModal
            companyName={companyName}
            setCompanyName={setCompanyName}
            roleName={roleName}
            setRoleName={setRoleName}
            fetchDashboardData={fetchDashboardData}
            setEditJob={setEditJob}
            setJobModal={setJobModal}
            jobModal={jobModal}
            editJob={editJob}
          />
        </div>

        {/* Stats Cards */}
        <StatsCards
          jobsData={jobsData}
          fetchDashboardData={fetchDashboardData}
        />

        {/* Jobs stats */}
        <JobsChart jobsData={jobsData} />

        {/* Recent Jobs */}
        <div className="mt-8 sm:flex sm:justify-between sm:items-center sm:gap-3">
          <div className="w-full">
            <input
              type="text"
              placeholder="Search company or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border-2 border-black/20 dark:border-white/20 rounded-xl px-4 py-3 text-black dark:text-white outline-none sm:flex-grow"
            />
          </div>
          <div className="mt-4 sm:mt-0">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-black dark:bg-white border border-white/20 dark:border-black/20 rounded-lg px-4 sm:px-3 py-3 text-sm sm:text-base text-white dark:text-black outline-none sm:w-auto lg:min-w-48"
            >
              <option value="ALL">ALL</option>
              <option value="APPLIED">APPLIED</option>
              <option value="INTERVIEW">INTERVIEW</option>
              <option value="OFFER">OFFER</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          </div>
        </div>
        <JobsList
          jobs={jobs}
          fetchDashboardData={fetchDashboardData}
          setEditJob={setEditJob}
          setJobModal={setJobModal}
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Dashboard;
