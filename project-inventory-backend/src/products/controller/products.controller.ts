import { RequestHandler } from "express";
import { createProductSchema } from "../schemas/products.schema";
import { createProductService } from "../services/products.service";

export const createProduct:RequestHandler = async (req,res) => {
    const data = createProductSchema.parse(req.body)
    const product = await createProductService(data)
    res.status(200).json({error:null,data:product})
} 