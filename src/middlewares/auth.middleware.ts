import { RequestHandler } from "express";
import { AppError } from "../utils/apperror";
import { validateToken } from "../utils/helper/helper";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError("Unauthorized", 401));
  }

  const [schema, token] = authHeader.split(" ");

  if (schema !== "Bearer" || !token) {
    return next(new AppError("Unauthorized", 401));
  }

  const user = await validateToken(token);
  if (!user) {
    return next(new AppError("Unauthorized", 401));
  }
  req.user = user;

  next();
};
