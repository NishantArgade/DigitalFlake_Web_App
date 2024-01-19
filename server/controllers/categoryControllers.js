import { Category } from "../models/categoryModel.js";
import { asyncErrorHandler } from "../Utils/common.js";

export const createCategory = asyncErrorHandler(async (req, res, next) => {
  const newCategory = await Category.create(req.body);
  res.status(201).json({
    status: "success",
    message: `Category created successfully`,
  });
});

export const getAllCategories = asyncErrorHandler(async (req, res, next) => {
  const allCategories = await Category.find();
  res.status(200).json({ status: "success", allCategories });
});
