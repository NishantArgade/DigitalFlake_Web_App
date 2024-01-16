import crypto from "crypto";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: "String",
  },
  email: {
    type: "String",
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: "String",
    required: [true, "password is required"],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  resetPasswordToken: {
    type: "String",
  },
  resetPasswordTokenExpires: { type: Date },
});

userSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordTokenExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export const User = mongoose.models.User || mongoose.model("User", userSchema);
