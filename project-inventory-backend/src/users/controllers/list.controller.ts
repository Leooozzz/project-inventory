import { RequestHandler } from "express";
import { listUserSchema } from "../schemas/list.schema";
import { listUserService } from "../services/list.service";

export const listUser: RequestHandler = async (req, res) => {
  const { offset, limit } = listUserSchema.parse(req.query);
  const users = await listUserService(offset, limit);
  res.status(200).json({ error: null, data: users });
};
