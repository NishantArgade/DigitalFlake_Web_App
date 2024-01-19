import { Router } from "express";
import {
  createCategory,
  getAllCategories,
} from "../controllers/categoryControllers.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.route("/create-category").post(auth, createCategory);
router.route("/all-categories").get(auth, getAllCategories);

export default router;
