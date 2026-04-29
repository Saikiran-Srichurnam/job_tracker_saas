import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/job.middlewares.js";

const router = Router();

// public Routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// secured Routes
router.route("/me").get(verifyJWT, getCurrentUser);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
