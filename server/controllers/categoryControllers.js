import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { Category } from "../models/categoryModel.js";
import { User } from "../models/userModel.js";

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
