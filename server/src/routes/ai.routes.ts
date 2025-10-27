import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.middleware";
import aiController from "../controllers/ai.controller";

const router = express.Router();

router.post(
  "/enhance-summary",
  isAuthenticatedUser,
  aiController.enhanceProfessionalSummary
);

router.post(
  "/enhance-job-description",
  isAuthenticatedUser,
  aiController.enhanceJobDescription
);

router.post(
  "/upload-resume",
  isAuthenticatedUser,
  aiController.uploadResume
);

export default router;
