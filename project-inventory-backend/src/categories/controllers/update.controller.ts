import { RequestHandler } from "express";
import { categoryIdSchema } from "../schemas/category.schema";
import { updateCategorySchema } from "../schemas/update.schema";
import { AppError } from "../../utils/apperror";
import { updateCategoryService } from "../services/update.service";

export const updateCategory:RequestHandler = async (req,res)=>{
    const {id} = categoryIdSchema.parse(req.params)
    const data = updateCategorySchema.parse(req.body)
    const category = await updateCategoryService(id,data)
    if(!category){
        throw new AppError("Category not found",404)
    }
    res.status(200).json({error:null,data:category})
}