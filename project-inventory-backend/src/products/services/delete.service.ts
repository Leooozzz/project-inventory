import { eq } from "drizzle-orm"
import { db } from "../../db/connection"
import { products } from "../../db/schema"

export const deleteProductService = async (id:string) => {
    const result = await db.update(products).set({deletedAt:new Date()}).where(eq(products.id,id)).returning()

    if(!result[0]) return null
    return result[0]
}