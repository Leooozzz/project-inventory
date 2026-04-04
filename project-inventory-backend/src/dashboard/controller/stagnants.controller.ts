import { RequestHandler } from "express";
import { stagnantProductsServices } from "../services/stagnants.service";
import { dateRangeSchema } from "../schema/moves.schema";

export const stagnantProducts:RequestHandler = async(req,res)=>{
    const query = dateRangeSchema.parse(req.query)
     const authUser = req.user;
    if (!authUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const data = await stagnantProductsServices(query,authUser.teamId)
    res.status(200).json({error:null,data:data})
}