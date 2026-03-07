import { eq } from "drizzle-orm";
import { db } from "../../db/connection";
import { users } from "../../db/schema";

export const logoutSevice = async (token: string) => {
  await db
    .update(users)
    .set({ token: null, updatedAt: new Date() })
    .where(eq(users.token, token));
};
