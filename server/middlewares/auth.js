import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!!authorization && authorization.startsWith("Bearer")) {
    try {
      const token = authorization.split(" ")[1];

      if (!token) return res.status(401).json({ error: "Invalide Token!" });

      const { userID } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      const user = await User.findById(userID).select("-password");

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ error: "Authorization Failed", error });
    }
  } else return res.status(401).json({ error: "Authorization Failed" });
};
