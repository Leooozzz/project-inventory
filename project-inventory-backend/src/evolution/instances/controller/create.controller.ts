import { RequestHandler } from "express";
import { createInstance } from "../services/create.service";
import { AppError } from "../../../utils/apperror";

export const create: RequestHandler = async (req, res) => {
  const { instanceName, phone } = req.body;
  const authUser = req.user;
  if (!authUser) {
    throw new AppError("Unauthorized", 401);
  }
  if (!instanceName) {
    throw new AppError("InstanceName is required", 400);
  }
  const data = await createInstance(instanceName, phone,authUser.teamId);
  return res.json(data);
};
