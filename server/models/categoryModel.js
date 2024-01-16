import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryName: "String",
  categoryDescription: "String",
  categoryStatus: "String",
});

export const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
