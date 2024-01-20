import { rateLimit } from "express-rate-limit";
import { CustomError } from "../Utils/CustomError.js";

export const reqRateLimiter = (duration, limit) => {
  return rateLimit({
    windowMs: duration * 60 * 1000,
    limit: limit,
    handler: (req, res, next, options) => {
      next(
        new CustomError(
          `Too many requests from this IP, please try again after ${duration} minutes`,
          options.statusCode
        )
      );
    },
    validate: {
      xForwardedForHeader: false,
    },
  });
};
