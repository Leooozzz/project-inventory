import { RequestHandler } from "express";
import { userIdSchema } from "../schemas/get.schema";
import { deleteUserService } from "../services/delete.service";
import { AppError } from "../../utils/apperror";

export const deleteUser: RequestHandler = async (req, res) => {
  const { id } = userIdSchema.parse(req.params);
  const authUser = req.user;
    if (!authUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  const deletedUser = await deleteUserService(id,authUser.teamId);
  if (!deletedUser) throw new AppError("User not found", 404);
  res.status(200).json({ error: null, data: null });
};
