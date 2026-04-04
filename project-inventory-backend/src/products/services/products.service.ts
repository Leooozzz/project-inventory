import { getCategoryById } from "../../categories/services/category.service";
import { db } from "../../db/connection";
import { newProduct, products } from "../../db/schema";
import { AppError } from "../../utils/apperror";

export const createProductService = async (data:newProduct) => {
    const category = await getCategoryById(data.categoryId,data.teamId)
    if(!category) throw new AppError("Category not found",404)
    const result = await db.insert(products).values(data).returning()
    if(!result[0]) return null
    return result[0]
}