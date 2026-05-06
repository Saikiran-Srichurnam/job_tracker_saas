import React from "react";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-md bg-white/5 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-wide">JobTrack Pro</h1>
            <p className="text-sm text-gray-300">Premium Job Tracking SaaS</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white text-slate-900 rounded-lg font-medium hover:scale-105 duration-300">
              Profile
            </button>
            <button className="px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 duration-300">
              Logout
            </button>
          </div>
        </div>
      </header>

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
            <h3 className="text-4xl font-bold mt-2">128</h3>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-xl border border-white/10">
            <p className="text-gray-300">Interviews</p>
            <h3 className="text-4xl font-bold mt-2">14</h3>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-xl border border-white/10">
            <p className="text-gray-300">Offers</p>
            <h3 className="text-4xl font-bold mt-2">3</h3>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-xl border border-white/10">
            <p className="text-gray-300">Pending</p>
            <h3 className="text-4xl font-bold mt-2">27</h3>
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
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:duration-300 hover:bg-white/30">
              Frontend Developer - Google
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              React Engineer - Microsoft
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              UI Developer - Amazon
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              MERN Developer - Netflix
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-white/5 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between gap-3 text-gray-300">
          <p>© 2026 JobTrack Pro. Built for modern job seekers.</p>
          <div className="flex gap-5">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
