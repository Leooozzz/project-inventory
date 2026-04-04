import { and, eq, sql } from "drizzle-orm";
import { listMosvesInput } from "../schema/list.schema";
import { moves, products } from "../../db/schema";
import { db } from "../../db/connection";

export const listMovesService = async (
  filters: listMosvesInput,
  teamId: string,
) => {
  const conditions = [];
  conditions.push(eq(moves.teamId, teamId));
  if (filters.productId) {
    conditions.push(eq(moves.productId, filters.productId));
  }
  const movesList = await db
    .select({
      id: moves.id,
      productId: products.id,
      productName: products.name,
      userId: moves.userId,
      type: moves.type,
      quantity: moves.quantity,
      unitPrice: moves.unitPrice,
      createdAt: moves.createdAt,
    })
    .from(moves)
    .leftJoin(
      products,
      and(eq(moves.productId, products.id), eq(products.teamId, teamId)),
    )
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(sql`${moves.createdAt} DESC`)
    .offset(filters.offset)
    .limit(filters.limit);

  return movesList;
};
