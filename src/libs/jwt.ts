import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";

configDotenv();

export const createJsonWebToken = (payload: any) => {
  return jwt.sign(payload, process.env.JSONWEBTOKEN_SECRET!);
};

export const readJsonWebToken = (hash: string) => {
  return jwt.verify(hash, process.env.JSONWEBTOKEN_SECRET!) ;
};
