import { RequestHandler } from "express";
import { listProductsSchema } from "../schemas/list.schema";
import { listProductsService } from "../services/list.service";

export const listProducts:RequestHandler = async (req,res) => {
    const {name,offset,limit}=listProductsSchema.parse(req.query)
    const authUser = req.user;
    if (!authUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const products = await listProductsService(name,offset,limit,authUser.teamId)
    res.status(200).json({error:null,data:products})
}