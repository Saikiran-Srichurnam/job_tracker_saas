import React from "react";

function JobsList({ jobs }) {
  
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
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:duration-300 hover:border-white/60 hover:text-slate-300 w-full flex justify-between items-center"
            key={job.id}
          >
            {job.role} - {job.company}
            <div className="mr-20 flex gap-10">
              <button className="hover:cursor-pointer px-4 py-2 hover:bg-blue-500/20 bg-gray-500/20 text-blue-300 rounded-lg transition duration-300 border border-gray-400/30 text-sm font-semibold backdrop-blur-md hover:text-blue-500" 
              onClick={handleEditBtn}>
                ✏️ edit
              </button>
              <button className="hover:cursor-pointer px-4 py-2 hover:bg-red-500/20 bg-red-500/5 text-red-300 hover:text-white rounded-lg transition duration-300 border border-red-400/30 text-sm font-semibold backdrop-blur-md">
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobsList;
