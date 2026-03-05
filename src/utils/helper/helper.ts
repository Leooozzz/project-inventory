import bcrypt from "bcrypt";
import { User, users } from "../../db/schema";
import { db } from "../../db/connection";
import { eq } from "drizzle-orm";
import { configDotenv } from "dotenv";
import { createJsonWebToken, readJsonWebToken } from "../../libs/jwt";
import { Request } from "express";
import { tokenTypePayload } from "./types/token.type";

configDotenv();

export const getUserByEmail = async (email: string) => {
  email = email.toLowerCase();
  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  const user = result[0];
  if (!user || user.deletedAt) return null;
  return user;
};

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

export const verifyPassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const formatUser = (user: User) => {
  const { password, ...userWithoutPassword } = user;
  if (userWithoutPassword.avatar) {
    userWithoutPassword.avatar = `${process.env.BASE_URL}/static/avatars/${userWithoutPassword.avatar}`;
  }
  return userWithoutPassword;
};

export const createToken = (user: User) => {
  return createJsonWebToken({ id: user.id });
};
export const getUserById = async (id: string) => {
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  const user = result[0];
  return result[0] || null;
};
export const verifyRequest = async (req: Request) => {
  const { authorization } = req.headers;

  if (authorization) {
    const authSplit = authorization.split("Bearer ");
    if (authSplit[1]) {
      const payload = readJsonWebToken(authSplit[1]);
      if (payload) {
        const userId = (payload as tokenTypePayload).id;
        const user = await getUserById(userId);
        if (user) return user;
      }
    }
  }
};
