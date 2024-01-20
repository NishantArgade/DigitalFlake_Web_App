import { Router } from "express";
import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
} from "../controllers/userControllers.js";
import { auth } from "../middlewares/auth.js";
import { reqRateLimiter } from "../middlewares/reqRateLimit.js";

const router = Router();

router.route("/login").post(reqRateLimiter(1, 3), login);
router.route("/logout").post(logout);
router
  .route("/getAccessToken")
  .post(auth, (req, res) => res.status(200).send("Access Token returned"));
router.route("/register").post(register);
router.route("/forgot-password").post(reqRateLimiter(10, 2), forgotPassword);
router.route("/reset-password/:token").patch(resetPassword);

export default router;
