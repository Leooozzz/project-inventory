import bcrypt from "bcrypt";
import { User, users } from "../../db/schema";
import { db } from "../../db/connection";
import { eq } from "drizzle-orm";
import { configDotenv } from "dotenv";
import { createJsonWebToken, readJsonWebToken } from "../../libs/jwt";
import { Request } from "express";
import { tokenTypePayload } from "./types/token.type";
import { AppError } from "../apperror";

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
  const {id,name,email,avatar,isAdmin} =userWithoutPassword

  return {id,name,email,avatar,isAdmin}
};

export const createToken = (user: User) => {
  return createJsonWebToken({ id: user.id });
};

export const getUserById = async (id: string) => {
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);

  const user = result[0];
  if(!user || user.deletedAt) return null;
  return user;
};


export const validateToken = async (token: string) => {
  await readJsonWebToken(token);
  const result = await db
    .select()
    .from(users)
    .where(eq(users.token, token))
    .limit(1);

  const user = result[0];
  if (!user || user.deletedAt) return null;
  return user;
};
