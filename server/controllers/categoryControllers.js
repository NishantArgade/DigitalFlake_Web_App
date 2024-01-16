import asyncHandler from "express-async-handler";
import { Category } from "../models/categoryModel.js";

export const createCategory = asyncHandler(async (req, res) => {
  const newCategory = await Category.create(req.body);
  res.status(201).json({
    msg: `Category created successfully`,
    newCategory,
  });
});

export const getAllCategories = asyncHandler(async (req, res) => {
  const allCategories = await Category.find();
  res.status(200).json({ allCategories });
});
