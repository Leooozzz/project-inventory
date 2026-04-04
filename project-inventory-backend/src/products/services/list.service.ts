import { eq, ilike, isNull, sql,and } from "drizzle-orm";
import { db } from "../../db/connection";
import { categories, products } from "../../db/schema";

export const listProductsService = async (
  name: string | undefined,
  offset: number = 0,
  limit: number = 10,
  teamId: string
) => {
  const conditions = [
    isNull(products.deletedAt),
    eq(products.teamId, teamId),
  ];

  if (name) {
    conditions.push(ilike(products.name, `%${name}%`));
  }

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
      updatedAt: products.updatedAt,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(and(...conditions))
    .offset(offset)
    .limit(limit);

  return productsList;
};