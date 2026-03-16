import { Request, RequestHandler } from "express"
import { readJsonWebToken } from "../libs/jwt";
import { formatUser, getUserById } from "../utils/helper/helper";

export type TokenTypePayload = {
  id: string;
};

export const VerifyRequest = async (req: Request) => {
  const { authorization } = req.headers;

  if (authorization) {
    const authSplit = authorization.split("Bearer ");
    if (authSplit[1]) {
      const payload = readJsonWebToken(authSplit[1]);
      if (payload) {
        const userId = (payload as TokenTypePayload).id;
        const user = await getUserById(userId);
        if (user) return user;
      }
    }
  }

  return false;
};

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const user = await VerifyRequest(req);
  if (!user) {
    return res.status(401).json({ errot: "Acess denied" });
  }
  req.user = user;

  next();
};
