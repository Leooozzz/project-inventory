import { RequestHandler } from "express";
import { produtIdSchema } from "../schemas/product.schema";
import { AppError } from "../../utils/apperror";
import { deleteProductService } from "../services/delete.service";

export const deleteProduct:RequestHandler = async (req,res)=>{
    const {id} = produtIdSchema.parse(req.params)
    const authUser = req.user;
    if (!authUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const product = await deleteProductService(id,authUser.teamId)
    if(!product)throw new AppError("Product not found",404)
    res.status(200).json({error:null,data:null})
}