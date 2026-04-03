import { db } from "../../db/connection";
import { users } from "../../db/schema";
import { and, eq } from "drizzle-orm";

export const deleteUserService = async (id: string, teamId: string) => {
  const result = await db
    .update(users)
    .set({ deletedAt: new Date() })
    .where(and(eq(users.id, id), eq(users.teamId, teamId)))
    .returning();

  return result[0] ?? null;
};
