import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controllers.js";

const router = Router();

// public Routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(getCurrentUser);
router.route("/logout").post(logoutUser);

export default router;
