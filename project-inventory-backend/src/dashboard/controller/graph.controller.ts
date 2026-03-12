import { RequestHandler } from "express";
import { dateRangeSchema } from "../schema/moves.schema";
import { movesGraphService } from "../services/graph.service";

export const movesGraph: RequestHandler = async (req, res) => {
    const query = dateRangeSchema.parse(req.query)
    const data = await movesGraphService(query)
    res.status(200).json({error:null,data:data})

};
