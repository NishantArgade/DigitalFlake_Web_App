import { v2 as cloudinary } from "cloudinary";

import { Product } from "../models/productModel.js";
import { asyncErrorHandler } from "../Utils/common.js";
import { CustomError } from "../Utils/CustomError.js";

export const createProduct = asyncErrorHandler(async (req, res, next) => {
  const { category, productName, packSize, mrp, status } = req.body;

  // Upload the file to Cloudinary
  cloudinary.uploader
    .upload_stream({ resource_type: "auto" }, async (error, result) => {
      if (error) {
        console.error("Error uploading to Cloudinary:", error);
        return next(new CustomError("Error while uploading file!", 500));
      }

      const imageUrl = result.secure_url;

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
        status: "success",
        message: `Product created successfully`,
      });
    })
    .end(req.file.buffer);
});
const uploadToCloudinary = async (
  buffer,
  productName,
  packSize,
  category,
  mrp,
  status,
  id
) => {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "auto" }, (error, result) => {
          if (error) {
            console.error("Error uploading to Cloudinary:", error);
            reject(new CustomError("Error uploading file", 500));
          } else {
            resolve(result);
          }
        })
        .end(buffer);
    });

    const imageUrl = result.secure_url;
    const productData = {
      productName: productName,
      productPackSize: Number(packSize),
      productCategory: category,
      productMRP: Number(mrp),
      productStatus: status,
      productImage: imageUrl,
    };
    const updatedProduct = await Product.findByIdAndUpdate(id, productData);
  } catch (error) {
    // Handle errors here
    console.error("Error in uploadToCloudinary:", error);
  }
};

export const updateProduct = asyncErrorHandler(async (req, res, next) => {
  const { id, category, productName, packSize, mrp, status } = req.body;

  // Upload the file to Cloudinary

  await uploadToCloudinary(
    req.file.buffer,
    productName,
    packSize,
    category,
    mrp,
    status,
    id
  );

  res.status(200).json({
    status: "success",
    message: `Product updated successfully`,
  });
});

export const getAllProducts = asyncErrorHandler(async (req, res, next) => {
  const allProducts = await Product.find();
  res.status(200).json({ status: "success", allProducts });
});

export const removeProduct = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.productId);

  if (!product) return next(new CustomError("Product not found!", 404));

  res
    .status(200)
    .json({ status: "success", message: "Product deleted successfully" });
});
