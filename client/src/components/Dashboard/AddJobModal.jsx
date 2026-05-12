import React, { useEffect, useState } from "react";
import { createJob } from "../../services/jobsApi.js";

function AddJobModal() {
  const [jobModal, setJobModal] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [roleName, setRoleName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createJob({
        company: companyName,
        role: roleName,
      });
      console.log(res);
    } catch (error) {
      console.log(error.message);
      return error;
    }

    // job modal state changed from false to true
    setJobModal(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <button
        className="mt-6 px-6 py-3 bg-white text-slate-900 rounded-xl font-semibold hover:scale-105 duration-300"
        onClick={() => {
          setJobModal(true);
          document.body.style.overflow = "hidden";
        }}
      >
        Add New Job
      </button>

      {jobModal && (
        <div className="fixed inset-0 bg-black/5 backdrop-blur-sm flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-black/50 text-white p-8 rounded-2xl shadow-2xl animate-popup flex flex-col justify-between h-[400px] w-[360px]"
          >
            <h1 className="text-2xl font-bold text-center tracking-wider underline underline-offset-8">
              CREATE NEW JOB
            </h1>
            <div className="flex flex-col justify-start">
              <label htmlFor="company" className="text-lg font-serif">
                Company
              </label>
              <input
                type="text"
                name=""
                id="company"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="bg-transparent border-b-2 border-b-white/50 mt-2 overflow-hidden px-2 outline-none"
              />
              <label htmlFor="role" className="text-lg font-serif mt-8">
                Role
              </label>
              <input
                type="text"
                name=""
                id="role"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                required
                className="bg-transparent border-b-2 border-b-white/50 mt-2 overflow-hidden px-2 outline-none"
              />
            </div>

            <button className="flex justify-center items-center mt-4 px-4 py-2 bg-white text-black rounded-lg">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default AddJobModal;
