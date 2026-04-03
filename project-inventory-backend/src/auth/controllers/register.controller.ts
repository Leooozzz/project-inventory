import { RequestHandler } from "express";
import { registerSchema } from "../schema/register.schema";
import * as registerService from "../services/register.service";
export const register: RequestHandler = async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);

    const user = await registerService.register(data);

    res.status(201).json({ error: null, data: user });
  } catch (error: any) {
    console.error(error);

    return res.status(400).json({
      message: error.message,
    });
  }
};