import React, { useEffect, useState } from "react";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import StatsCards from "./StatsCards.jsx";
import JobsList from "./JobsList.jsx";
import AddJobModal from "./AddJobModal.jsx";
import { getAllJobs, getJobStats } from "../../services/jobsApi.js";
import user from "../../../public/images/user.png";

function Dashboard() {
  const [jobsData, setJobsData] = useState({});
  const [jobs, setJobs] = useState([]);
  const [jobModal, setJobModal] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [viewProfile, setViewProfile] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const res = await getAllJobs();
      const jobs = await getJobStats();
      console.log(res);
      setJobs(res.data.jobs);
      console.log(jobs);
      setJobsData(jobs.data);
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white flex flex-col">
      {/* Header */}
      <Header viewProfile={viewProfile} setViewProfile={setViewProfile} />

      {/* view profile modal */}
      {viewProfile && (
        <div className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm flex justify-end w-full">
          <div className="w-96 min-h-screen overflow-y-auto bg-slate-950 border-l border-white/10 shadow-2xl p-6 flex flex-col">
            {/* Profile Header */}
            <div className="flex flex-col items-center text-center border-b border-white/10 pb-6">
              <img
                src={user}
                alt="User"
                className="w-24 h-24 rounded-full object-cover bg-white/10 p-2 border border-white/20"
              />

              <h2 className="text-2xl font-bold mt-4"></h2>

              <p className="text-gray-400 text-sm">
                Welcome back to your dashboard
              </p>
            </div>

            {/* Profile Stats */}
            <div className="mt-6 space-y-4 flex-grow">
              <div className="bg-white/10 border border-white/10 rounded-xl p-4">
                <p className="text-gray-400 text-sm">Email</p>

                <h3 className="font-semibold mt-1">saikiran.dev@gmail.com</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 border border-white/10 rounded-xl p-4">
                  <p className="text-gray-400 text-sm">Applications</p>

                  <h3 className="text-2xl font-bold mt-1">
                    {jobsData?.totalJobs || 0}
                  </h3>
                </div>

                <div className="bg-white/10 border border-white/10 rounded-xl p-4">
                  <p className="text-gray-400 text-sm">Interviews</p>

                  <h3 className="text-2xl font-bold mt-1">
                    {jobsData?.interview || 0}
                  </h3>
                </div>

                <div className="bg-white/10 border border-white/10 rounded-xl p-4">
                  <p className="text-gray-400 text-sm">Offers</p>

                  <h3 className="text-2xl font-bold mt-1">
                    {jobsData?.offer || 0}
                  </h3>
                </div>

                <div className="bg-white/10 border border-white/10 rounded-xl p-4">
                  <p className="text-gray-400 text-sm">Rejected</p>

                  <h3 className="text-2xl font-bold mt-1">
                    {jobsData?.rejected || 0}
                  </h3>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-5 shadow-lg">
                <p className="text-sm text-white/80">Member Since</p>

                <h2 className="text-xl font-bold mt-2">2025</h2>

                <p className="text-sm mt-2 text-white/90">
                  Tracking career growth with Job Tracker SaaS.
                </p>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="space-y-3 pt-6 border-t border-white/10">
              <button className="w-full bg-white/10 hover:bg-white/20 transition-all py-3 rounded-xl font-medium">
                Edit Profile
              </button>

              <button
                onClick={() => {
                  setViewProfile(false);
                  document.body.style.overflow = "auto";
                }}
                className="w-full bg-red-500 hover:bg-red-600 transition-all py-3 rounded-xl font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-8">
        {/* Hero Section */}
        <div className="bg-white/10 border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-4xl font-bold leading-tight">
            Manage Your Career Journey Like a Pro
          </h2>
          <p className="text-gray-300 mt-3 text-lg">
            Track applications, interviews, offers, and progress with one
            premium dashboard.
          </p>
          {/* Add Job Button */}
          <AddJobModal
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

        {/* Recent Jobs */}
        <JobsList
          jobs={jobs}
          fetchDashboardData={fetchDashboardData}
          setEditJob={setEditJob}
          setJobModal={setJobModal}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Dashboard;
