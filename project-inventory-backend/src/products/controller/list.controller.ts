import { RequestHandler } from "express";
import { listProductsSchema } from "../schemas/list.schema";
import { listProductsService } from "../services/list.service";

export const listProducts:RequestHandler = async (req,res) => {
    const {name,offset,limit}=listProductsSchema.parse(req.query)
    const products = await listProductsService(name,offset,limit)
    res.status(200).json({error:null,data:products})
}