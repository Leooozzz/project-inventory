import { eq } from "drizzle-orm";
import { getCategoryById } from "../../categories/services/category.service";
import { db } from "../../db/connection";
import { newProduct, products } from "../../db/schema";
import { AppError } from "../../utils/apperror";

export const updateProductService = async(id:string,data:Partial<newProduct>)=>{
    if(data.categoryId){
        const category =  await getCategoryById(data.categoryId)
        if(!category)throw new AppError("Categoty not Found",404)
    }
    const updateData = {...data,updateAt: new Date()}
    const  result = await db.update(products).set(updateData).where(eq(products.id,id)).returning()
    if(!result[0]) return null
    return result[0];
}