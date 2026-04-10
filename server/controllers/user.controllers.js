import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../config/db.js";

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  // validation
  if (
    [email, username, password].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are Required");
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new ApiError(400, "User Already Exist");
    }

    const newUser = await prisma.user.create({
      data: {
        name: username,
        email: email,
        password: password,
      },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, { newUser }, "Registering user Successfully"));
  } catch (error) {
    console.log("Registering user failed:", error);
    throw new ApiError(400, error.message);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => !field || field.trim() === "")) {
    throw new ApiError(401, "Email and Password both are Required");
  }

  try {
    const user = prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new ApiError(401, "User does not Exist");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, { user }, "User logined Successfully"));
  } catch (error) {
    console.log("Login failed:", error);
    throw new ApiError(400, error.message);
  }
});

export { registerUser, loginUser };
