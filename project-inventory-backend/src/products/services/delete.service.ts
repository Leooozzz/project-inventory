import { and, eq } from "drizzle-orm";
import { db } from "../../db/connection";
import { products } from "../../db/schema";

export const deleteProductService = async (id: string, teamId: string) => {
  const result = await db
    .update(products)
    .set({ deletedAt: new Date() })
    .where(and(eq(products.id, id), eq(products.teamId, teamId)))
    .returning();

  if (!result[0]) return null;
  return result[0];
};
