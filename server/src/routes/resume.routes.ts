import express from "express";

import { isAuthenticatedUser } from "../middlewares/auth.middleware";
import resumeController from "../controllers/resume.controller";
import { uploadSingle } from "../middlewares/multer.middleware";

const router = express.Router();

router.post(
  "/",
  isAuthenticatedUser,
  uploadSingle,
  resumeController.createResume
);

router.get("/", isAuthenticatedUser, resumeController.getUserResume);

router.put(
  "/:resumeId",
  isAuthenticatedUser,
  uploadSingle,
  resumeController.updateResume
);

router.delete("/:resumeId", isAuthenticatedUser, resumeController.deleteResume);

export default router;
