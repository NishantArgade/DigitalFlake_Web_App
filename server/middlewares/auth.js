import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../Utils/common.js";
import { User } from "../models/userModel.js";

export const auth = expressAsyncHandler(async (req, res, next) => {
  const access_token =
    req.cookies.access_token ||
    req.headers?.authorization?.replace("Bearer ", "");
  try {
    if (access_token) {
      const { userID } = jwt.verify(
        access_token,
        process.env.ACCESS_TOKEN_SECRET
      );
      // console.log("payload", userID);

      const user = await User.findById(userID).select("-password");

      req.user = user;
      console.log(access_token);
      next();
    } else {
      const refresh_token = req.cookies.refresh_token;
      console.log("refresh token", refresh_token);

      // generate new access token from refresh token
      const user = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);

      // generate access token from refresh token
      const accessToken = generateAccessToken(user);

      res.cookie("access_token", accessToken, {
        maxAge: process.env.ACCESS_TOKEN_EXPIRE * 60 * 1000,
        httpOnly: false,
      });

      // allow user to go ahead
      next();
    }
  } catch (error) {
    console.log(error);
    res.clearCookie("access_token");
    return res.status(401).send("Authentication failed!");
  }
});
