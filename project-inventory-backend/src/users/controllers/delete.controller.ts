import { RequestHandler } from "express";
import { userIdSchema } from "../schemas/get.schema";
import { deleteUserService } from "../services/delete.service";
import { AppError } from "../../utils/apperror";

export const deleteUser: RequestHandler = async (req, res) => {
  const { id } = userIdSchema.parse(req.params);
  const deletedUser = await deleteUserService(id);
  if (!deleteUser) throw new AppError("User not found", 404);
  res.status(200).json({ error: null, data: null });
};
