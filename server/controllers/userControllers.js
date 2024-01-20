import bcrypt from "bcrypt";
import crypto from "crypto";
import { CustomError } from "../Utils/CustomError.js";
import {
  asyncErrorHandler,
  cookieOptions,
  generateAccessToken,
  generateRefreshToken,
} from "../Utils/common.js";
import { default as resetPasswordBodyHTMLFormat } from "../Utils/resetPasswordBodyHTMLFormat.js";
import { sendMail } from "../Utils/sendMail.js";
import { User } from "../models/userModel.js";

export const login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new CustomError("Invalide Credentials!", 400));

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new CustomError("Invalide Credentials!", 400));

  // generate and save access token
  const accessToken = generateAccessToken(user);
  const accessTokenCookieOptions = cookieOptions(
    process.env.ACCESS_TOKEN_EXPIRE,
    false
  );
  res.cookie("access_token", accessToken, accessTokenCookieOptions);

  // generate and save refresh token
  const refreshToken = generateRefreshToken(user);
  const refreshTokenCookieOptions = cookieOptions(
    process.env.REFRESH_TOKEN_EXPIRE,
    true
  );
  res.cookie("refresh_token", refreshToken, refreshTokenCookieOptions);

  res.status(200).json({
    status: "success",
    message: "Logged in successfully. Welcome back!",
  });
});

export const register = asyncErrorHandler(async (req, res, next) => {
  const { password } = req.body;

  await User.findOne({ email: req.body.email });

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = { ...req.body, password: hashedPassword };

  const newUser = await User.create(user);

  res.status(201).json({
    status: "success",
    message: "Registration successful. Welcome aboard!",
  });
});

export const logout = asyncErrorHandler(async (req, res, next) => {
  const options = {
    sameSite: "none",
    secure: true,
  };

  res.clearCookie("access_token", options);
  res.clearCookie("refresh_token", options);

  res.status(200).json({ status: "success", message: "Logout Successfully" });
});

export const forgotPassword = asyncErrorHandler(async (req, res, next) => {
  //get user based on posted email
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    return next(
      new CustomError("The user of this email is not register!", 404)
    );

  //generate a random reset token
  const resetPasswordToken = user.createResetPasswordToken();

  //save resetToken into user entry
  user.save({ validateBeforeSave: false });

  //send the token back to user email
  const subject = "Reset Password";
  const text = `We have received a password reset request. Please use the below link to reset your password.\n\n ${process.env.CLIENT_URL}/reset-password/${resetPasswordToken} \n\nThis reset password link will be only valid for 10 minutes.\n\n`;
  const html = resetPasswordBodyHTMLFormat(resetPasswordToken);

  try {
    await sendMail({
      email,
      subject,
      text,
      html,
    });

    res.status(200).json({
      status: "success",
      message: "Password reset link sent to user mail successfully",
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

export const resetPassword = asyncErrorHandler(async (req, res, next) => {
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
    return next(new CustomError("Token is invalid or has expired!", 400));
  }

  const { password } = req.body;

  // reseting the user password
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpires = undefined;
  await user.save();

  return next(new CustomError("Password updated successfully", 200));
});
