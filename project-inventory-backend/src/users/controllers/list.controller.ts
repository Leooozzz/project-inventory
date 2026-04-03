import { RequestHandler } from "express";
import { listUserSchema } from "../schemas/list.schema";
import { listUserService } from "../services/list.service";

export const listUser: RequestHandler = async (req, res) => {
  const { offset, limit } = listUserSchema.parse(req.query);
  const authUser = req.user;
    if (!authUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  const users = await listUserService(offset, limit,authUser.teamId);
  res.status(200).json({ error: null, data: users });
};
