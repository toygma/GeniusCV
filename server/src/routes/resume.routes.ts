import express from "express";

import { isAuthenticatedUser } from "../middlewares/auth.middleware";
import resumeController from "../controllers/resume.controller";

const router = express.Router();

router.post("/", resumeController.createResume);

router.get("/", isAuthenticatedUser, resumeController.getUserResume);

router.put("/:resumeId", resumeController.updateResume);

router.delete("/:resumeId", resumeController.deleteResume);

export default router;
