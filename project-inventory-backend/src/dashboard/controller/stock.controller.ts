import { RequestHandler } from "express";
import { lowStockServices } from "../services/stock.services";

export const lowStock:RequestHandler = async (req,res)=>{
     const authUser = req.user;
    if (!authUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const data = await lowStockServices(authUser.teamId)
    res.status(200).json({error:null,data:data})
}