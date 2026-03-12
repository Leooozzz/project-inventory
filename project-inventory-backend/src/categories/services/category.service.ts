import { eq } from "drizzle-orm"
import { db } from "../../db/connection"
import { categories } from "../../db/schema"

export const getCategoryById = async (id:string) =>{
    const result = await db.select().from(categories).where(eq(categories.id,id)).limit(1)
    const category = result[0]
    if(!category || category.deletedAt) return null

    return category
}