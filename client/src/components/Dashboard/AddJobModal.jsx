import React, { useEffect} from "react";
import { createJob, updateJob } from "../../services/jobsApi.js";
import toast from "react-hot-toast";

function AddJobModal({
  fetchDashboardData,
  editJob,
  setEditJob,
  jobModal,
  setJobModal,
  companyName,
  setCompanyName,
  roleName,
  setRoleName
}) {

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editJob) {
        await updateJob(
          {
            company: companyName,
            role: roleName,
          },
          editJob.id,
        );
        toast.success("Job Updated Successfully");
      } else {
        const res = await createJob({
          company: companyName,
          role: roleName,
        });
        console.log(res);
        toast.success("Job Added Successfully");
      }

      await fetchDashboardData();

      setEditJob(null);
      setCompanyName("");
      setRoleName("");

      setJobModal(false);
      document.body.style.overflow = "auto";
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
      return error;
    }
  };

  const handleClose = () => {
    setEditJob(null);
    setCompanyName("");
    setRoleName("");
    setJobModal(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    if (editJob) {
      setCompanyName(editJob.company);
      setRoleName(editJob.role);
    }
  }, [editJob]);


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
            className="bg-black/50 text-white p-6 sm:p-8 rounded-2xl shadow-2xl animate-popup flex flex-col justify-between min-h-[400px] w-[90%] max-w-[360px]"
          >
            <h1 className="text-2xl font-bold text-center tracking-wider underline underline-offset-8">
              {editJob ? "UPDATE JOB" : "CREATE NEW JOB"}
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

            <div className="flex justify-between items-center mt-4">
              <button className="px-4 py-2 bg-white text-black rounded-lg hover:duration-300 hover:bg-white/20 hover:border-2 hover:border-white/30 border-2 text-md font-semibold hover:text-white">
                {editJob ? "Update Job" : "Submit"}
              </button>
              <button
                className="px-4 py-2 bg-white text-black rounded-lg hover:duration-300 hover:bg-white/20 hover:border-2 hover:border-white/30 border-2 text-md font-semibold hover:text-white"
                onClick={handleClose}
              >
                {editJob ? "Cancel" : "Close"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AddJobModal;
