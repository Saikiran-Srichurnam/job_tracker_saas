import { prisma } from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createJob = asyncHandler(async (req, res, next) => {
  const { company, position } = req.body;

  if ([company, position].some((field) => !field || field.trim() === "")) {
    throw new ApiError(400, "All Fields are Required");
  }

  const job = await prisma.job.create({
    data: {
      company: company,
      position: position,
      userId: req.user.id,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, { job }, "Job created Successfully"));
});

// get all jobs
const getAllJobs = asyncHandler(async (req, res, next) => {
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

  return res
    .status(200)
    .json(new ApiResponse(200, { jobs }, "Jobs fetched Successfully"));
});

export { createJob, getAllJobs };
