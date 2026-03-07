import { RequestHandler } from "express";
import { db } from "../../db/connection";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

export const deleteUserService = async (id: string) => {
  const result = await db
    .update(users)
    .set({ deletedAt: new Date() })
    .where(eq(users.id, id))
    .returning();

  return result[0] ?? null;
};
