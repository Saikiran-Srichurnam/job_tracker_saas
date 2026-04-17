import Router from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  updateJobStatus,
} from "../controllers/job.controllers.js";
import { verifyJWT } from "../middlewares/job.middlewares.js";

const router = Router();

router.route("/").post(verifyJWT, createJob);
router.route("/").get(verifyJWT, getAllJobs);
router.route("/:jobId").patch(verifyJWT, updateJob);
router.route("/:jobId").delete(verifyJWT, deleteJob);
router.route("/:jobId/status").patch(verifyJWT, updateJobStatus);

export default router;
