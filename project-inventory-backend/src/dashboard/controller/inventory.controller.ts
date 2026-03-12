import { RequestHandler } from "express";
import { getInventoryValueSevice } from "../services/inventory.service";

export const getInventoryValue:RequestHandler = async(req,res)=>{
    const totalValue = await getInventoryValueSevice()
    res.status(200).json({erro:null,data:{totalValue}})
}