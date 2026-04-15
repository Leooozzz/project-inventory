import { RequestHandler } from "express";
import { AppError } from "../../../utils/apperror";
import { connectInstance } from "../services/connect.service";

export const connect: RequestHandler = async (req, res) => {
  const instanceName = req.params.instance as string;
  if (!instanceName) {
    throw new AppError("InstanceId is required", 400);
  }
  const authUser = req.user;

  if (!authUser) {
    throw new AppError("Unauthorized", 401);
  }

  const data = await connectInstance(instanceName, authUser.teamId);

  return res.json(data);
};
