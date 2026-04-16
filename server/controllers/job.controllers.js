import { prisma } from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createJob = asyncHandler(async (req, res, next) => {
  const { company, role } = req.body;

  if ([company, role].some((field) => !field || field.trim() === "")) {
    throw new ApiError(400, "All Fields are Required");
  }

  const job = await prisma.job.create({
    data: {
      company: company,
      role: role,
      userId: req.user.id,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, { job }, "Job created Successfully"));
});

// get all jobs
const getAllJobs = asyncHandler(async (req, res, next) => {
  console.log("Current userId:", req.user.id);
  const jobs = await prisma.job.findMany({
    where: {
      userId: req.user.id,
    },
    // include: {
    //   user: {
    //     select: {
    //       id: true,
    //       email: true,
    //     },
    //   },
    // },
  });

  console.log("Jobs found:", jobs.length);

  return res
    .status(200)
    .json(new ApiResponse(200, jobs, "Jobs fetched Successfully"));
});

// update job by id
const updateJob = asyncHandler(async (req, res, next) => {
  const { jobId } = req.params;
  const { company, role } = req.body;

  // validate jobId
  if (!jobId) {
    throw new ApiError(401, "Invalid job id");
  }

  // Find job
  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  // check if job exists
  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  // ownership check
  if (job.userId !== req.user.id) {
    throw new ApiError(403, "You are not allowed to update job");
  }

  // update job
  const updatedJob = await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      company: company,
      role: role,
    },
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { updatedJob },
        `Updated the ${jobId} data Successfully`,
      ),
    );
});

const deleteJob = asyncHandler(async (req, res, next) => {
  const { jobId } = req.params;

  if (!jobId) {
    throw new ApiError(401, "Invalid job id");
  }

  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  if (job.userId !== req.user.id) {
    throw new ApiError(403, "You are not allowed to delete this job");
  }

  await prisma.job.delete({
    where: { id: jobId },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Job deleted Successfully"));
});

export { createJob, getAllJobs, updateJob, deleteJob };
