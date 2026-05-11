import React, { useEffect, useState } from "react";
import { getAllJobs, getJobStats } from "../../services/jobsApi.js";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

function Dashboard() {
  const [jobsData, setJobsData] = useState({});
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobsStats = async () => {
      try {
        const res = await getJobStats();
        console.log(res);
        setJobsData(res.data);
      } catch (error) {
        console.log(error.message);
        return error;
      }
    };

    const fetchAllJobs = async () => {
      try {
        const res = await getAllJobs();
        console.log(res);
        setJobs(res.data.jobs);
      } catch (error) {
        console.log(error.message);
        return error;
      }
    };

    fetchJobsStats();
    fetchAllJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white flex flex-col">
      {/* Header */}
      <Header />

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
          <button className="mt-6 px-6 py-3 bg-white text-slate-900 rounded-xl font-semibold hover:scale-105 duration-300">
            Add New Job
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
          <div className="bg-white/10 p-6 rounded-2xl shadow-xl border border-white/10">
            <p className="text-gray-300">Applications</p>
            <h3 className="text-4xl font-bold mt-2">
              {jobsData?.totalJobsCount || 0}
            </h3>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-xl border border-white/10">
            <p className="text-gray-300">Interviews</p>
            <h3 className="text-4xl font-bold mt-2">
              {jobsData?.interviewJobsCount || 0}
            </h3>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-xl border border-white/10">
            <p className="text-gray-300">Offers</p>
            <h3 className="text-4xl font-bold mt-2">
              {jobsData?.offerJobsCount || 0}
            </h3>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-xl border border-white/10">
            <p className="text-gray-300">Rejected</p>
            <h3 className="text-4xl font-bold mt-2">
              {jobsData?.rejectedJobsCount || 0}
            </h3>
          </div>
        </div>

        {/* Recent Jobs */}
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
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Dashboard;
