import bcrypt from "bcrypt";
import crypto from "crypto";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { CustomError } from "../Utils/CustomError.js";
import resetPasswordHTML from "../Utils/resetPasswordHTML.js";
import { sendMail } from "../Utils/sendMail.js";
import { User } from "../models/userModel.js";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Invalide Credentials!" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalide Credentials!" });

  // generate access token and refresh token
  const accessToken = jwt.sign(
    { userID: user._id, userName: user.name, userEmail: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "5d" }
  );

  const refreshToken = jwt.sign(
    { userID: user._id, userName: user.name, userEmail: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "30d" }
  );
  // Set the access token in the response header
  res.header("Authorization", `Bearer ${accessToken}`);

  res.status(200).json({
    msg: `Logged in successfully`,
    accessToken,
    refreshToken,
  });
});

export const register = asyncHandler(async (req, res) => {
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ error: "Password and Confirm Password does not match!" });

  const isExists = await User.findOne({ email: req.body.email });
  if (isExists) {
    return res
      .status(400)
      .json({ error: "User of this mailid has already been registered" });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = { ...req.body, password: hashedPassword };

  const newUser = await User.create(user);

  res.status(201).json(newUser);
});

export const refreshJWTToken = asyncHandler(async (req, res) => {
  const refreshToken = req.body.refreshToken;
  const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  // generate access token and refresh token
  const accessToken = jwt.sign(decode, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5d",
  });

  // Set the access token in the response header
  res.header("Authorization", `Bearer ${accessToken}`);

  res.status(200).json({ accessToken });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  //get user based on posted email
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ error: "User not found!" });

  //generate a random reset token
  const resetPasswordToken = user.createResetPasswordToken();

  //save resetToken into user entry
  user.save({ validateBeforeSave: false });

  //send the token back to user email
  const subject = "Reset Password";
  const text = `We have received a password reset request. Please use the below link to reset your password.\n\n http://localhost:5000/api/reset-password/${resetPasswordToken} \n\nThis reset password link will be only valid for 10 minutes.\n\n`;
  const html = resetPasswordHTML(resetPasswordToken);

  try {
    await sendMail({
      email,
      subject,
      text,
      html,
    });
    res.status(200).json({
      status: "success",
      msg: "Password reset link sent to user successfully",
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires = undefined;

    user.save({ validateBeforeSave: false });

    return next(
      new CustomError(
        "There was an error sending the password reset email. Please try again later.",
        500
      )
    );
  }
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  // converte plain resetPasswordToken into hashed resetPasswordToken for campairesion
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // if the user exists with give password token & not expired
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      error: "Token is invalid or has expired",
    });
  }
  const { password } = req.body;

  // reseting the user password
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpires = undefined;
  await user.save();

  res
    .status(200)
    .json({ status: "success", msg: "Password updated successfully", user });
});
