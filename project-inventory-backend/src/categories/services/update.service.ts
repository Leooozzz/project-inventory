import { and, eq } from "drizzle-orm";
import { db } from "../../db/connection";
import { categories, newCategory } from "../../db/schema";

export const updateCategoryService = async (
  id: string,
  teamId: string,
  data: Partial<newCategory>,
) => {
  const updateData = { ...data, updatedAt: new Date() };
  const result = await db
    .update(categories)
    .set(updateData)
    .where(and(eq(categories.id, id), eq(categories.teamId, teamId)))
    .returning();

  if (!result[0]) return null;

  return result[0];
};
