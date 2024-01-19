import jwt from "jsonwebtoken";

export const asyncErrorHandler = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((error) => next(error));
  };
};

export const generateAccessToken = function (user) {
  const accessToken = jwt.sign(
    { userID: user._id, userName: user.name, userEmail: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRE * 60 * 1000 }
  );
  return accessToken;
};

export const generateRefreshToken = function (user) {
  const refreshToken = jwt.sign(
    { userID: user._id, userName: user.name, userEmail: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRE * 60 * 1000 }
  );
  return refreshToken;
};
