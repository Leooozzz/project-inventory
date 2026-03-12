import { RequestHandler } from "express";
import { produtIdSchema } from "../schemas/product.schema";
import { getProductByIdWithCategoryDetails } from "../services/product.service";
import { AppError } from "../../utils/apperror";

export const getProduct:RequestHandler = async (req,res) => {
    const {id} = produtIdSchema.parse(req.params)
    const product = await getProductByIdWithCategoryDetails(id)
    if(!product) throw new AppError("Product not found",404)
    
        res.status(200).json({error:null,data:product})
}