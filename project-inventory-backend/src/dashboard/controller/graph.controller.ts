import { RequestHandler } from "express";
import { dateRangeSchema } from "../schema/moves.schema";
import { movesGraphService } from "../services/graph.service";

export const movesGraph: RequestHandler = async (req, res) => {
    const query = dateRangeSchema.parse(req.query)
    const authUser = req.user;
    if (!authUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const data = await movesGraphService(query,authUser.teamId)
    res.status(200).json({error:null,data:data})

};
