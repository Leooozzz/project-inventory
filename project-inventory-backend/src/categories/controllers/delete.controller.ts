import { RequestHandler } from "express";
import { categoryIdSchema } from "../schemas/category.schema";
import { deleteCategoryService } from "../services/delete.service";
import { AppError } from "../../utils/apperror";

export const deleteCategory:RequestHandler = async (req,res)=>{
    const {id}= categoryIdSchema.parse(req.params)
    const authUser = req.user;
    if (!authUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const category = await deleteCategoryService(id,authUser.teamId)
    if(!category) throw new AppError("Category not found",404)
    res.status(200).json({error:null,data:null})
}