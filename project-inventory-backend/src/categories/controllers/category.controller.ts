import { RequestHandler } from "express";
import { categoryIdSchema } from "../schemas/category.schema";
import { AppError } from "../../utils/apperror";
import { getCategoryById } from "../services/category.service";

export const getCategory:RequestHandler = async (req,res)=>{
    const {id}= categoryIdSchema.parse(req.params);
     const authUser = req.user;
    if (!authUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const category = await getCategoryById(id,authUser.teamId)
    if(!category){
        throw new AppError("Category not Found",404)
    }
    res.status(200).json({error:null,data:category})
}