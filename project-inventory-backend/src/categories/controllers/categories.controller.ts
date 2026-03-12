import { RequestHandler } from "express";
import { createCategorySchema } from "../schemas/categories.schema";
import { createCategoryService } from "../services/categories.service";

export const createCategory: RequestHandler = async (req, res) => {
    const data = createCategorySchema.parse(req.body);
    const category = await createCategoryService(data)
    res.status(201).json({error:null,data:category})
};
