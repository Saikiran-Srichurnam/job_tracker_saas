import React from "react";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import StatsCards from "./StatsCards.jsx";
import JobsList from "./JobsList.jsx";

function Dashboard() {
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
        <StatsCards />

        {/* Recent Jobs */}
        <JobsList />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Dashboard;
