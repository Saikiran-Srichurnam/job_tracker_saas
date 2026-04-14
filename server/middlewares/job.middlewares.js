import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    //1 Get token from cookies or headers
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized Request");
    }

    // 2 Verify token safely
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // 3 Find user
    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.userId,
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (!user) {
      throw new ApiError(400, "Invalid accessToken");
    }

    //4 Attach user
    req.user = user;

    next();
  } catch (error) {
    console.log("Invalid access token:", error);
    throw new ApiError(401, error.message);
  }
});

export { verifyJWT };
