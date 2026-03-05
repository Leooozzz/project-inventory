import { db } from "../../db/connection";
import { newUser, users } from "../../db/schema";
import {
  formatUser,
  getUserByEmail,
  hashPassword,
} from "../../utils/helper/helper";

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
