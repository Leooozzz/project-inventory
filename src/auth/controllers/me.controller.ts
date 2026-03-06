import { RequestHandler } from "express";
import { AppError } from "../../utils/apperror";
import { getUserByIdPublic } from "../services/me.services";

export const getMe: RequestHandler = async (req, res) => {
  if (!req.user) return null;

  const user = await getUserByIdPublic(req.user.id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.json({ error: null, data: user });
};
