import { CustomError } from "../Utils/CustomError.js";

const devErrors = function (res, error) {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};

const prodErrors = function (res, error) {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(error.statusCode).json({
      status: "error",
      message: "Something went wrong please! try again later!",
    });
  }
};

const castErrorHandler = (error) => {
  const msg = `Invalid value for ${error.path}: ${error.value}`;
  return new CustomError(msg, 400);
};

const duplicateKeyErrorHandler = (error) => {
  let msg;
  if (error.keyValue.email)
    msg = `This email ${error.keyValue.email} is already in use. Please use another email!`;
  else msg = `Something went wrong with key`;

  return new CustomError(msg, 400);
};

// Global express error handler
export const errorHandler = (error, req, res, next) => {
  error.status = error.status || "error";
  error.statusCode = error.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    devErrors(res, error);
  } else {
    if (error.name === "CastError") {
      error = castErrorHandler(error);
    }
    if (error.code === 11000) {
      error = duplicateKeyErrorHandler(error);
    }
    // console.log(error);

    prodErrors(res, error);
  }
};
