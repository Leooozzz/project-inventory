import { RequestHandler } from "express";
import { userIdSchema } from "../schemas/get.schema";
import { updateUserSchema } from "../schemas/update.schema";
import { updateUserSevice } from "../services/update.service";
import { saveAvatar } from "../services/file.service";

export const updateUser: RequestHandler = async (req, res) => {
  const { id } = userIdSchema.parse(req.params);
  const data = updateUserSchema.parse(req.body);
  const authUser = req.user;
  if (!authUser) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  let avatarFileName: string | undefined;
  if (req.file) {
    avatarFileName = await saveAvatar(req.file.buffer, req.file.originalname);
  }
  const updateData = { ...data };
  if (avatarFileName) {
    updateData.avatar = avatarFileName;
  }
  const updatedUser = await updateUserSevice(id, authUser.teamId, updateData);
  res.status(200).json({ error: null, data: updatedUser });
};