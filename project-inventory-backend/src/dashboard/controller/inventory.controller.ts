import { RequestHandler } from "express";
import { getInventoryValueSevice } from "../services/inventory.service";

export const getInventoryValue:RequestHandler = async(req,res)=>{
    const authUser = req.user;
    if (!authUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const totalValue = await getInventoryValueSevice(authUser.teamId)
    res.status(200).json({erro:null,data:{totalValue}})
}