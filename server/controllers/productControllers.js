import { v2 as cloudinary } from "cloudinary";
import asyncHandler from "express-async-handler";

import { Product } from "../models/productModel.js";

export const createProduct = asyncHandler(async (req, res) => {
  try {
    const { category, productName, packSize, mrp, status } = req.body;

    // Upload the file to Cloudinary
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, async (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          return res.status(500).json({ error: "Error uploading file" });
        }

        // Handle the Cloudinary response (result) as needed
        const imageUrl = result.secure_url;
        // const publicId = result.public_id;

        const productData = {
          productName: productName,
          productPackSize: Number(packSize),
          productCategory: category,
          productMRP: Number(mrp),
          productStatus: status,
          productImage: imageUrl,
        };

        const newProduct = await Product.create(productData);

        res.status(201).json({
          msg: `Product created successfully`,
          newProduct,
        });
      })
      .end(req.file.buffer); // Pass the file buffer to the Cloudinary upload stream
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id, category, productName, packSize, mrp, status } = req.body;
    // Upload the file to Cloudinary
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, async (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          return res.status(500).json({ error: "Error uploading file" });
        }

        // Handle the Cloudinary response (result) as needed
        const imageUrl = result.secure_url;
        // const publicId = result.public_id;

        const productData = {
          productName: productName,
          productPackSize: Number(packSize),
          productCategory: category,
          productMRP: Number(mrp),
          productStatus: status,
          productImage: imageUrl,
        };

        const updatedProduct = await Product.findByIdAndUpdate(id, productData);

        res.status(201).json({
          msg: `Product updated successfully`,
          updatedProduct,
        });
      })
      .end(req.file.buffer); // Pass the file buffer to the Cloudinary upload stream
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const allProducts = await Product.find();
  res.status(200).json({ allProducts });
});
export const removeProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.productId);

  if (!product) return res.status(400).json({ error: "Product not found" });

  res
    .status(200)
    .json({ status: "success", msg: "Product deleted successfuly" });
});
