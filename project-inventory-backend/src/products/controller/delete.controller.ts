import { RequestHandler } from "express";
import { produtIdSchema } from "../schemas/product.schema";
import { AppError } from "../../utils/apperror";
import { deleteProductService } from "../services/delete.service";

export const deleteProduct:RequestHandler = async (req,res)=>{
    const {id} = produtIdSchema.parse(req.params)
    const product = await deleteProductService(id)
    if(!product)throw new AppError("Product not found",404)
    res.status(200).json({error:null,data:null})
}