import { RequestHandler } from "express";
import { categoryIdSchema } from "../schemas/category.schema";
import { deleteCategoryService } from "../services/delete.service";
import { AppError } from "../../utils/apperror";

export const deleteCategory:RequestHandler = async (req,res)=>{
    const {id}= categoryIdSchema.parse(req.params)
    const category = await deleteCategoryService(id)
    if(!category) throw new AppError("Category not found",404)
    res.status(200).json({error:null,data:null})
}