import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";


export const createJsonWebToken = (payload: any) => {
  return jwt.sign(payload, process.env.JSONWEBTOKEN_SECRET!,{
    expiresIn: "7d"
  });
};

export const readJsonWebToken = (hash: string) => {
  return jwt.verify(hash, process.env.JSONWEBTOKEN_SECRET!) ;
};
