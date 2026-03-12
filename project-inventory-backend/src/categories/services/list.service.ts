import { eq, isNull, sql } from "drizzle-orm";
import { db } from "../../db/connection";
import { categories, products } from "../../db/schema";

export const listCategoriesServices = async (
  includeProductCount: boolean = false,
) => {
  if (includeProductCount) {
    const catetegoriesWithCount = await db
      .select({
        id: categories.id,
        name: categories.name,
        createdAt: categories.createdAt,
        productsCount: sql<number>`count(${products.id})::int`
        
  })
      .from(categories)
      .leftJoin(products, eq(categories.id, products.categoryId))
      .where(isNull(categories.deletedAt))
      .groupBy(categories.id)
      
      return catetegoriesWithCount;
  }
  const categoriesList = await db
    .select()
    .from(categories)
    .where(isNull(categories.deletedAt));
  return categoriesList;
};
