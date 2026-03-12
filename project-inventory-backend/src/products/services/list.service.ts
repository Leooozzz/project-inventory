import { eq, ilike, isNull, sql } from "drizzle-orm";
import { db } from "../../db/connection";
import { categories, products } from "../../db/schema";

export const listProductsService = async (
  name?: string,
  offset: number = 0,
  limit: number = 10,
) => {
  const whereCondition = name
    ? sql`${products.deletedAt} IS NULL AND ${ilike(products.name, `%${name}%`)}`
    : isNull(products.deletedAt);
  const productsList = await db
    .select({
      id: products.id,
      name: products.name,
      categoryId: products.categoryId,
      categoryName: categories.name,
      unitPrice: products.unitPrice,
      unitType: products.unitType,
      quantity: products.quantity,
      minimumQuantity: products.minimumQuantity,
      maximumQuantity: products.maximumQuantity,
      createdAt: products.createdAt,
      updateAt: products.updatedAt,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(whereCondition)
    .offset(offset)
    .limit(limit);
  return productsList;
};
