import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: "String",
  productPackSize: { type: "Number", min: 0 },
  productCategory: "String",
  productMRP: { type: "Number", min: 0 },
  productImage: "String",
  productStatus: "String",
});

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
