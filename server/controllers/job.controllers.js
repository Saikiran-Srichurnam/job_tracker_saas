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

  if (!jobId) {
    throw new ApiError(401, "Invalid job id");
  }

  const job = await prisma.job.update({
    where: {
      id: jobId,
      userId: req.user.id,
    },
    data: {
      company: company,
      role: role,
    },
  });

  return res
    .status(201)
    .json(
      new ApiResponse(201, { job }, `Updated the ${jobId} data Successfully`),
    );
});

const deleteJob = asyncHandler(async (req, res, next) => {
  const { jobId } = req.params;

  if (!jobId) {
    throw new ApiError(401, "Invalid job id");
  }

  const job = await prisma.job.delete({
    where: {
      id: jobId,
      userId: req.user.id,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { job }, "Delete Job Successfully"));
});

export { createJob, getAllJobs, updateJob, deleteJob };
