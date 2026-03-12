import { RequestHandler } from "express";
import { stagnantProductsServices } from "../services/stagnants.service";
import { dateRangeSchema } from "../schema/moves.schema";

export const stagnantProducts:RequestHandler = async(req,res)=>{
    const query = dateRangeSchema.parse(req.query)
    const data = await stagnantProductsServices(query)
    res.status(200).json({error:null,data:data})
}