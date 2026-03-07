import { RequestHandler } from "express";
import { listCategoriesShema } from "../schemas/list.schema";

export const listCategories:RequestHandler = async (req,res) => {
    const {includeProductCount} = listCategoriesShema.parse(req.params)
    
} 