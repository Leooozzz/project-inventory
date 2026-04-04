import { and, eq, isNull, sql } from "drizzle-orm";
import { db } from "../../db/connection";
import { products } from "../../db/schema";
import { lte } from "zod";

export const lowStockServices = async (teamId: string) => {
  const results = await db
    .select()
    .from(products)
    .where(
      and(
        isNull(products.deletedAt),
        eq(products.teamId,teamId),
        sql`${products.quantity} <= (${products.minimumQuantity} * 1.1)`,
      ),
    )
    .orderBy(products.quantity);
  return results;
};
