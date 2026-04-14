import Router from "express";
import {
  createJob,
  getAllJobs,
  updateJob,
} from "../controllers/job.controllers.js";
import { verifyJWT } from "../middlewares/job.middlewares.js";

const router = Router();

router.route("/").post(verifyJWT, createJob);
router.route("/get-jobs").get(verifyJWT, getAllJobs);
router.route("/update-job/:jobId").patch(verifyJWT, updateJob);

export default router;
