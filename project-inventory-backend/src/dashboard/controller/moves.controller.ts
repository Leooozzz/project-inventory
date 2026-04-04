import { RequestHandler } from "express";
import { dateRangeSchema } from "../schema/moves.schema";
import { movesSumaryService } from "../services/moves.service";

export const getMovesSumary:RequestHandler = async (req,res)=>{
    const query = dateRangeSchema.parse(req.query)
    const authUser = req.user;
    if (!authUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const data = await movesSumaryService(query,authUser.teamId)
    res.status(200).json({error:null,data:data})
}