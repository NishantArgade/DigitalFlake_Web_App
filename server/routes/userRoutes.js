import { Router } from "express";
import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
} from "../controllers/userControllers.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.route("/login").post(login);
router.route("/logout").post(logout);
router
  .route("/getAccessToken")
  .post(auth, (req, res) => res.status(200).send("Access Token returned"));
router.route("/register").post(register);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").patch(resetPassword);
// router.route("/refreshToken").post(refreshJWTToken);

export default router;
