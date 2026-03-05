import { eq } from "drizzle-orm";
import { db } from "../../db/connection";
import { users } from "../../db/schema";
import {
  createToken,
  formatUser,
  getUserByEmail,
  verifyPassword,
} from "../../utils/helper/helper";

export const loginService = async (email: string, password: string) => {
  email = email.toLowerCase();
  const user = await getUserByEmail(email);
  if (!user) return null;
  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) return null;

  const token = createToken(user);

  await db
    .update(users)
    .set({ token, updatedAt: new Date() })
    .where(eq(users.id, user.id));
  const userFormated = formatUser(user);
  return { ...userFormated, token };
};
