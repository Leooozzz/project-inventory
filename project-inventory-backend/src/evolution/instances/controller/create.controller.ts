import { RequestHandler } from "express";
import { createInstance } from "../services/create.service";
import { AppError } from "../../../utils/apperror";
import { db } from "../../../db/connection";
import { whatsappInstance } from "../../../db/schema";

export const create: RequestHandler = async (req, res) => {
  const { instanceName, phone } = req.body;
  const authUser = req.user;
  if (!authUser) {
    throw new AppError("Unauthorized", 401);
  }
  if (!instanceName) {
    throw new AppError("InstanceName is required", 400);
  }
  const data = await createInstance(instanceName, phone);

  await db.insert(whatsappInstance).values({
    id:data.instance.instanceId,
    phone,
    name: instanceName,
    teamId: authUser.teamId,
    status: data.instance.status === "open" ? "connected" : "disconnected",
  });
  return res.json(data);
};
