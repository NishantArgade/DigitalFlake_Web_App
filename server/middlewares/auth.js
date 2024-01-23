import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { CustomError } from "../Utils/CustomError.js";
import { cookieOptions, generateAccessToken } from "../Utils/common.js";
import { User } from "../models/userModel.js";

const protect = expressAsyncHandler(async (req, res, next) => {
  const access_token =
    req.cookies.access_token ||
    req.headers?.authorization?.replace("Bearer ", "");
  try {
    if (access_token) {
      const { userID } = jwt.verify(
        access_token,
        process.env.ACCESS_TOKEN_SECRET
      );
      const user = await User.findById(userID).select("-password");
      req.user = user;
      next();
    } else {
      const refresh_token = req.cookies.refresh_token;

      // generate new access token from refresh token
      const { userID } = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET
      );
      const user = await User.findById(userID).select("-password");

      req.user = user;
      // generate and save access token
      const accessToken = generateAccessToken(user);
      const accessTokenCookieOptions = cookieOptions(
        process.env.ACCESS_TOKEN_EXPIRE
      );
      res.cookie("access_token", accessToken, accessTokenCookieOptions);

      // allow user to go ahead
      next();
    }
  } catch (error) {
    res.clearCookie("access_token");
    return res
      .status(401)
      .send({ status: false, message: "Authentication failed!" });
  }
});

const restrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(new CustomError("You are not allowed to perform this action", 403));
    }

    next();
  };
};

export default { protect, restrict, verifyToken };
