import { RequestHandler } from "express";
import { dateRangeSchema } from "../schema/moves.schema";
import { movesSumaryService } from "../services/moves.service";

export const getMovesSumary:RequestHandler = async (req,res)=>{
    const query = dateRangeSchema.parse(req.query)
    console.log(req.query)
    const data = await movesSumaryService(query)
    res.status(200).json({error:null,data:data})
}