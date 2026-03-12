import { and, gte, lte, sql } from "drizzle-orm";
import { DateRangeInput } from "../schema/moves.schema";
import { moves } from "../../db/schema";
import { db } from "../../db/connection";

export const movesSumaryService = async (range: DateRangeInput) => {
  const conditions = [];
  if (range.startDate) {
    const startDate = new Date(range.startDate);
    conditions.push(gte(moves.createdAt, startDate));
  }
  if (range.endDate) {
    const endDate = new Date(range.endDate);
    endDate.setUTCHours(23, 59, 59, 999);
    conditions.push(lte(moves.createdAt, endDate));
  }
  const result = await db
    .select({
      type: moves.type,
      totalValue: sql<number>`SUM(${moves.quantity} * ${moves.unitPrice})`,
      count: sql<number>`COUNT(*)`,
    })
    .from(moves)
    .where(and(...conditions))
    .groupBy(moves.type);

  const summary = {
    in: { value: 0, count: 0 },
    out: { value: 0, count: 0 },
  };
  result.forEach((row) => {
    summary[row.type] = {
      value: row.totalValue,
      count: row.count,
    };
  });

  return summary;
};
