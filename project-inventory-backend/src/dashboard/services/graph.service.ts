import { and, eq, gte, lte, sql } from "drizzle-orm";
import { DateRangeInput } from "../schema/moves.schema";
import { moves } from "../../db/schema";
import { db } from "../../db/connection";

export const movesGraphService = async (range: DateRangeInput,teamId:string) => {
    const conditions = [
        eq(moves.type,'out')
    ];
      if (range.startDate) {
        const startDate = new Date(range.startDate);
        conditions.push(gte(moves.createdAt, startDate));
        conditions.push(eq(moves.teamId, teamId));
      }
      if (range.endDate) {
        const endDate = new Date(range.endDate);
        endDate.setUTCHours(23, 59, 59, 999);
        conditions.push(lte(moves.createdAt, endDate));
      }
      const dateFormated = sql<string>`TO_CHAR(${moves.createdAt},'YYYY-MM-DD')`
      const results = await db.select({
        date:dateFormated,
        totalValue: sql<number>`SUM(${moves.quantity} * ${moves.unitPrice})`
      }).from(moves).where(and(...conditions)).groupBy(dateFormated).orderBy(dateFormated)

      return results;
}