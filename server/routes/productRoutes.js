import { v2 as cloudinary } from "cloudinary";
import { Router } from "express";
import multer from "multer";
import {
  createProduct,
  getAllProducts,
  removeProduct,
  updateProduct,
} from "../controllers/productControllers.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage: storage });

router
  .route("/create-product")
  .post(auth, upload.single("file"), createProduct);
router
  .route("/update-product")
  .post(auth, upload.single("file"), updateProduct);
router.route("/remove-product/:productId").delete(auth, removeProduct);
router.route("/all-products").get(auth, getAllProducts);

export default router;
