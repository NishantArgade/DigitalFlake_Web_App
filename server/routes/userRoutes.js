import { Router } from "express";
import {
  forgotPassword,
  resetPassword,
  login,
  register,
  refreshJWTToken
} from "../controllers/userControllers.js";

const router = Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").patch(resetPassword);
router.route("/refreshToken").post(refreshJWTToken);

export default router;
