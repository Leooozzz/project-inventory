import { RequestHandler } from "express";
import { AppError } from "../../utils/apperror";
import { loginService } from "../services/login.service";
import { loginSchema } from "../schema/login.schema";
import { createToken, formatUser } from "../../utils/helper/helper";

export const login: RequestHandler = async (req, res) => {
  const data = loginSchema.parse(req.body);
  const result = await loginService(data.email, data.password);
  if (!result) {
    throw new AppError("Invalid credentials", 401);
  }
  const token = createToken(result)
  const userFormated = formatUser(result)
  res.status(201).json({ error: null, data: userFormated,token},);
};
