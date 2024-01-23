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

export const cookieOptions = function (tokenExpire) {
  const options = {
    maxAge: tokenExpire * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  };

  // Check if the environment is production
  // if (process.env.NODE_ENV === "production") {
  //   // Enable secure setting only in production
  //   options.sameSite = "none";
  //   options.secure = true;
  // }
  return options;
};
