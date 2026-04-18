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
// const getAllJobs = asyncHandler(async (req, res, next) => {
//   console.log("Current userId:", req.user.id);
//   const jobs = await prisma.job.findMany({
//     where: {
//       userId: req.user.id,
//     },
//     // include: {
//     //   user: {
//     //     select: {
//     //       id: true,
//     //       email: true,
//     //     },
//     //   },
//     // },
//   });

//   console.log("Jobs found:", jobs.length);

//   return res
//     .status(200)
//     .json(new ApiResponse(200, jobs, "Jobs fetched Successfully"));
// });

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

// delete job by id
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

// update job status
const updateJobStatus = asyncHandler(async (req, res, next) => {
  const { jobId } = req.params;
  const { status } = req.body;

  if (!jobId) {
    throw new ApiError(400, "Invalid job Id");
  }

  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  if (job.userId !== req.user.id) {
    throw new ApiError(403, "You are not allowed to update the Job status");
  }

  const validStatuses = ["APPLIED", "INTERVIEW", "REJECTED", "OFFER"];

  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const updateStatus = await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      status: status,
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, updateStatus, "Updated job status successfully"),
    );
});

const getAllJobs = asyncHandler(async (req, res, next) => {
  // we usually use query for filter or search
  const { page, limit, sort, status, search } = req.query;

  // convert to numbers for pagination
  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;
  const skip = (pageNum - 1) * limitNum;

  const filter = {};

  // we know in mongodb we use $regex: query, options: "i" but for prisma we use contains instead of regex and mode:"insensitive" instead of options
  // SEARCH ROLE + COMPANY
  if (search) {
    filter.OR = [
      {
        role: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        company: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  // STATUS FILTER FORM THE PRISMA ENUM
  const validStatuses = ["APPLIED", "INTERVIEW", "REJECTED", "OFFER"];

  if (status && validStatuses.includes(status)) {
    filter.status = status;
  }

  // USER FILTER
  filter.userId = req.user.id;

  // SORTING
  let orderBy = { createdAt: "desc" };

  if (sort === "oldest") orderBy = { createdAt: "asc" };
  else if (sort === "a-z") orderBy = { company: "asc" };
  else if (sort === "z-a") orderBy = { company: "desc" };
  else if (sort === "status") orderBy = { status: "asc" };

  const jobs = await prisma.job.findMany({
    where: filter,
    orderBy,
    skip,
    take: limitNum,
  });

  if (!jobs || jobs.length === 0) {
    throw new ApiError(404, "Jobs not found");
  }

  const totalJobs = await prisma.job.count({
    where: filter,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        jobs: jobs,
        totalJobs,
        totalPages: Math.ceil(totalJobs / limitNum),
        currentPage: pageNum,
      },
      "Jobs fetched successfully",
    ),
  );
});

const getJobStats = asyncHandler(async (req, res, next) => {
  const [
    totalJobsCount,
    appliedJobsCount,
    interviewJobsCount,
    rejectedJobsCount,
    offerJobsCount,
  ] = await Promise.all([
    prisma.job.count({
      where: {
        userId: req.user.id,
      },
    }),

    prisma.job.count({
      where: {
        userId: req.user.id,
        status: "APPLIED",
      },
    }),

    prisma.job.count({
      where: {
        userId: req.user.id,
        status: "INTERVIEW",
      },
    }),

    prisma.job.count({
      where: {
        userId: req.user.id,
        status: "REJECTED",
      },
    }),

    prisma.job.count({
      where: {
        userId: req.user.id,
        status: "OFFER",
      },
    }),
  ]);

  // const totalJobsCount = jobs.length;
  // const appliedJobsCount = jobs.filter((job) => job.status === "APPLIED").length;
  // const interviewJobsCount = jobs.filter((job) => job.status === "INTERVIEW").length;
  // const rejectedJobsCount = jobs.filter((job) => job.status === "REJECTED").length;
  // const offerJobsCount = jobs.filter((job) => job.status === "OFFER").length;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalJobsCount,
        appliedJobsCount,
        interviewJobsCount,
        rejectedJobsCount,
        offerJobsCount,
      },
      "Job stats fetched successfully",
    ),
  );
});

export {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  updateJobStatus,
  getJobStats,
};
