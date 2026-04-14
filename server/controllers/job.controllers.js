import { prisma } from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createJob = asyncHandler(async (req, res, next) => {
  const { company, position, status } = req.body;

  if ([company, position, status].some((field) => !field || field === "")) {
    throw new ApiError(400, "All Fields are Required");
  }

  const job = await prisma.job.create({
    data: {
      company: company,
      position: position,
      status: status,
      userId: req.user.id,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { job }, "Job created Successfully"));
});

export { createJob };
