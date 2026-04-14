import Router from "express";
import { createJob, getAllJobs } from "../controllers/job.controllers.js";
import { verifyJWT } from "../middlewares/job.middlewares.js";

const router = Router();

router.route("/").post(verifyJWT, createJob);
router.route("/get-jobs").get(verifyJWT,getAllJobs);

export default router;
