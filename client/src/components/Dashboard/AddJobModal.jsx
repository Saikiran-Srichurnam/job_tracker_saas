import React, { useEffect } from "react";
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
  setRoleName,
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
        await createJob({
          company: companyName,
          role: roleName,
        });

        toast.success("Job Added Successfully");
      }

      await fetchDashboardData();

      setEditJob(null);
      setCompanyName("");
      setRoleName("");

      setJobModal(false);
      document.body.style.overflow = "auto";
    } catch (error) {
      toast.error("Something went wrong");
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
        className="mt-6 px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-xl font-semibold hover:opacity-90 transition"
        onClick={() => {
          setJobModal(true);
          document.body.style.overflow = "hidden";
        }}
      >
        Add New Job
      </button>

      {jobModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 rounded-3xl p-8 shadow-2xl"
          >
            <h1 className="text-3xl font-bold mb-2 text-black dark:text-white">
              {editJob ? "Update Job" : "Add New Job"}
            </h1>

            <p className="text-slate-500 dark:text-slate-400 mb-8">
              Manage your job applications efficiently.
            </p>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium">
                  Company Name
                </label>

                <input
                  type="text"
                  value={companyName}
                  onChange={(e) =>
                    setCompanyName(e.target.value)
                  }
                  required
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-slate-950 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Role
                </label>

                <input
                  type="text"
                  value={roleName}
                  onChange={(e) =>
                    setRoleName(e.target.value)
                  }
                  required
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-slate-950 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                className="flex-1 bg-black text-white dark:bg-white dark:text-black py-3 rounded-xl font-semibold"
              >
                {editJob ? "Update" : "Create"}
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="flex-1 border border-black/10 dark:border-white/10 py-3 rounded-xl font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AddJobModal;