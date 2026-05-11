import { api } from "./api.js";

// GET ALL JOBS
export const getAllJobs = async () => {
  try {
    const response = await api.get("/jobs/");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// CREATE JOB
export const createJob = async (jobData) => {
  try {
    const response = await api.post("/jobs/", jobData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// UPDATE JOB
export const updatedJob = async (jobData, jobId) => {
  try {
    const response = await api.patch(`/jobs/${jobId}`, jobData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// DELETE JOB
export const deleteJob = async (jobId) => {
  try {
    const response = await api.delete(`/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// UPDATE JOB STATUS
export const updateJobStatus = async (jobId, status) => {
  try {
    const response = await api.patch(`/jobs/${jobId}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// GET JOB STATS
export const getJobStats = async () => {
  try {
    const response = await api.get("/jobs/stats");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
