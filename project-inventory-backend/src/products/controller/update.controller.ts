import { RequestHandler } from "express";
import { produtIdSchema } from "../schemas/product.schema";
import { updateProductSchema } from "../schemas/update.schema";
import { AppError } from "../../utils/apperror";
import { updateProductService } from "../services/update.service";

export const updateProduct:RequestHandler = async (req,res)=>{
    const {id} = produtIdSchema.parse(req.params)
    const data = updateProductSchema.parse(req.body)
     const authUser = req.user;
    if (!authUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const product = await updateProductService(id,authUser.teamId,data)
    if(!product) throw new AppError("Product not found",404)
    res.status(200).json({error:null,data:product})
}