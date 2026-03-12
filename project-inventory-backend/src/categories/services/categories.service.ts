import { db } from "../../db/connection";
import { categories, newCategory } from "../../db/schema";

export const createCategoryService = async (data:newCategory) => {
    const result = await db.insert(categories).values(data).returning()
    return result[0]
};
