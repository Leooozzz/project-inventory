import { eq } from "drizzle-orm";
import { db } from "../../db/connection";
import { newUser, User, users } from "../../db/schema";
import bcrypt from "bcrypt";
import { configDotenv } from "dotenv";

configDotenv();

export const createUser = async (data: newUser) => {
  const existingUser = await getUserByEmail(data.email);
  if (existingUser) {
    throw new Error("This email is already in use.");
  }

  const hashedPassword = await hashPassword(data.password);

  const userToInsert: newUser = {
    ...data,
    email: data.email.toLowerCase(),
    password: hashedPassword,
  };
  const result = await db.insert(users).values(userToInsert).returning();
  const user = result[0];

  return formatUser(user);
};

//helper functions

export const getUserByEmail = async (email: string) => {
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  const user = result[0];
  if (!user || user.deletedAt) return null;
  return user;
};

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

export const formatUser = (user: User) => {
  const { password, ...userWithoutPassword } = user;
  if (userWithoutPassword.avatar) {
    userWithoutPassword.avatar = `${process.env.BASE_URL}/static/avatars/${userWithoutPassword.avatar}`;
  }
  return userWithoutPassword;
};
