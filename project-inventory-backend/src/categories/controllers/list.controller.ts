import { RequestHandler } from "express";
import { listCategoriesSchema } from "../schemas/list.schema";
import { listCategoriesServices } from "../services/list.service";

export const listCategories:RequestHandler = async (req,res) => {
    const {includeProductCount} = listCategoriesSchema.parse(req.query)
    const authUser = req.user;
    if (!authUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const categories = await listCategoriesServices(includeProductCount,authUser.teamId)
    res.status(200).json({error:null,data:categories})
} 