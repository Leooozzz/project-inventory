import { and, eq, gte, isNull, lte, sql } from "drizzle-orm";
import { db } from "../../db/connection";
import { DateRangeInput } from "../schema/moves.schema";
import { moves, products } from "../../db/schema";

export const stagnantProductsServices = async (
  range: DateRangeInput,
  teamId: string,
) => {
  const conditions = [eq(moves.type, "out"), eq(moves.teamId, teamId)];
  if (range.startDate) {
    const startDate = new Date(range.startDate);
    conditions.push(gte(moves.createdAt, startDate));
  }
  if (range.endDate) {
    const endDate = new Date(range.endDate);
    endDate.setUTCHours(23, 59, 59, 999);
    conditions.push(lte(moves.createdAt, endDate));
  }
  const results = await db
    .select()
    .from(products)
    .where(
      and(
        isNull(products.deletedAt),
        eq(products.teamId, teamId),
        sql`${products.id} NOT IN (
  SELECT ${moves.productId}
  FROM ${moves}
  WHERE ${and(...conditions)}
)`,
      ),
    );
  return results;
};
