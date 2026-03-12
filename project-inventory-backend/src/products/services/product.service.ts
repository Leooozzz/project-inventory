import { and, eq, isNull } from "drizzle-orm"
import { db } from "../../db/connection"
import { categories, products } from "../../db/schema"

export const getProductByIdWithCategoryDetails = async (id:string) => {
      const result = await db
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
        .where(and(eq(products.id,id),isNull(products.deletedAt)))
        .limit(1)

        if(!result[0]) return null
        return result[0]
}