import { RequestHandler } from "express";
import { createCategorySchema } from "../schemas/category.schema";
import { createCategoryService } from "../services/category.service";

export const createCategory: RequestHandler = async (req, res) => {
    const data = createCategorySchema.parse(req.body);
    const category = await createCategoryService(data)
    res.status(201).json({error:null,data:category})
};
