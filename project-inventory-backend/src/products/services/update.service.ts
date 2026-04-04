import { and, eq } from "drizzle-orm";
import { getCategoryById } from "../../categories/services/category.service";
import { db } from "../../db/connection";
import { newProduct, products } from "../../db/schema";
import { AppError } from "../../utils/apperror";

export const updateProductService = async(id:string,teamId:string,data:Partial<newProduct>)=>{
    if(data.categoryId){
        const category =  await getCategoryById(data.categoryId,teamId)
        if(!category)throw new AppError("Categoty not Found",404)
    }
    const updatedData = {...data,updateAt: new Date()}
    const  result = await db.update(products).set(updatedData).where(and(eq(products.id,id),eq(products.teamId,teamId))).returning()
    if(!result[0]) return null
    return result[0];
}