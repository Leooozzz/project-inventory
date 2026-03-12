import { eq } from "drizzle-orm";
import { db } from "../../db/connection";
import { categories, newCategory } from "../../db/schema";

export const updateCategoryService = async (id:string,data:Partial<newCategory>) => {
    const updateData = {...data,updatedAt: new Date()}
    const result = await db.update(categories).set(updateData).where(eq(categories.id,id)).returning()

    if(!result[0]) return null
    
    return result[0]
}