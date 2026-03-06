import { RequestHandler } from "express";
import { logoutSevice } from "../services/logout.services";

export const logout: RequestHandler = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const [_, token] = authHeader.split(" ");
    if (token) {
      await logoutSevice(token);
    }
  }
  res.json({ error: null, data: { message: "Logout successful" } });
};
