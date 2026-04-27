import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Generating Access Token
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
  );
};

// Generating Refresh Token
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
  );
};

// generating refresh and access token so that we can destructure tokens using this method
const generateRefreshAndAccessToken = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ApiError(400, "Invalid user id");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await prisma.refreshToken.create({
      data: {
        hashedToken: refreshToken, // Must match the field name in schema
        userId: user.id,
      },
    });
    return { refreshToken, accessToken };
  } catch (error) {
    console.log("Error generating access and refresh token", error);
    throw new ApiError(
      401,
      "Something went wrong while generating access and refreshToken",
    );
  }
};

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

    // Password verification
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: username,
        email: email,
        password: hashedPassword,
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
  const { email, password, username } = req.body;

  if ([email, password].some((field) => !field || field.trim() === "")) {
    throw new ApiError(401, "Email and Password both are Required");
  }

  try {
    const user = await prisma.user.findFirst({
      //findUnique doesnot support OR operator so use findFirst
      where: {
        OR: [{ email: email }, { name: username }],
      },
    });
    if (!user) {
      throw new ApiError(401, "User does not Exist");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid Credentials");
    }

    const { refreshToken, accessToken } = await generateRefreshAndAccessToken(
      user.id,
    );

    const loggedInUser = {
      id: user.id,
      email: user.email,
      name: user.username,
    };

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(200, { loggedInUser }, "User logined Successfully"),
      );
  } catch (error) {
    console.log("Login failed:", error);
    throw new ApiError(400, error.message);
  }
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
  const currentUser = req.user;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: currentUser.userId,
      },
    });

    if (!user) {
      throw new ApiError(400, "Invalid user id");
    }

    await prisma.refreshToken.deleteMany({
      where: {
        userId: user.id,
      },
    });

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };
    return res
      .status(200)
      .clearCookie("accessToken") 
      .clearCookie("refreshToken")
      .json(new ApiResponse(200, null, "User logged out Successfully"));
  } catch (error) {
    console.log("Logout failed:", error);
    throw new ApiError(400, error.message);
  }
});

export { generateRefreshAndAccessToken, registerUser, loginUser, logoutUser };
