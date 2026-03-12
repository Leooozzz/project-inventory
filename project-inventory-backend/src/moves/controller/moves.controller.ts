import { RequestHandler } from "express";
import { moveSchema } from "../schema/move.schema";
import { AppError } from "../../utils/apperror";
import { addMoveService } from "../services/move.service";

export const addMove:RequestHandler = async (req,res) => {
    if(!req.user) throw new AppError("Unauthorized",401)
    const data = await moveSchema.parse(req.body)
    const move = await addMoveService({...data,userId:req.user.id})
    res.status(201).json({error:null,data:move})
}