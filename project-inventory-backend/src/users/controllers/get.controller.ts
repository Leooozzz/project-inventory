import { RequestHandler } from "express";
import { userIdSchema } from "../schemas/get.schema";
import { getUserByIdPublic } from "../../auth/services/me.service";
import { AppError } from "../../utils/apperror";

export const getUser: RequestHandler = async (req, res) => {
  const { id } = userIdSchema.parse(req.params);
 const authUser = req.user;
    if (!authUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  const user = await getUserByIdPublic(id,authUser.teamId);

  if (!user) throw new AppError("User not found", 404);

  res.status(200).json({ error: null, data: user });
};
