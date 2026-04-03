import { and, eq, isNull } from "drizzle-orm";
import { db } from "../../db/connection";
import { categories, products } from "../../db/schema";
import { AppError } from "../../utils/apperror";

export const deleteCategoryService = async (id: string, teamId: string) => {
  const existingProduct = await db
    .select()
    .from(products)
    .where(and(eq(products.categoryId, id), isNull(products.deletedAt)))
    .limit(1);
  if (existingProduct[0]) {
    throw new AppError(
      "It is not possible to delete a category if there are products.",
      400,
    );
  }
  const result = await db
    .update(categories)
    .set({ deletedAt: new Date() })
    .where(and(eq(categories.id, id), eq(categories.teamId, teamId)))
    .returning();
  if (!result[0]) return null;
  return result[0];
};
