import express from "express";
import authController from "../controllers/auth.controller";
import { isAuthenticatedUser } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.get("/me",isAuthenticatedUser, authController.getUserMe);



export default router;