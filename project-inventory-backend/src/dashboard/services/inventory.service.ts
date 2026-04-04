import { and, eq, isNull, sql } from "drizzle-orm";
import { db } from "../../db/connection";
import { products } from "../../db/schema";

export const getInventoryValueSevice = async (teamId: string) => {
  const result = await db
    .select({
      totalValue: sql<number>`SUM(${products.quantity} * ${products.unitPrice})`,
    })
    .from(products)
    .where(and(isNull(products.deletedAt), eq(products.teamId, teamId)));

  if (result[0]?.totalValue) return result[0].totalValue;
  return 0;
};
