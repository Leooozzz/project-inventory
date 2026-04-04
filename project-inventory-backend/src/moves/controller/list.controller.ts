import { RequestHandler } from "express";
import { listMovesSchema } from "../schema/list.schema";
import { listMovesService } from "../services/list.service";

export const listMoves:RequestHandler =async(req,res) => {
    const query = listMovesSchema.parse(req.query)
    const authUser = req.user;
    if (!authUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const moves = await listMovesService(query,authUser.teamId)
    res.status(200).json({error:null,data:moves})
}