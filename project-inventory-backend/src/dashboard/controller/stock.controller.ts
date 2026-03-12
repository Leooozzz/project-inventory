import { RequestHandler } from "express";
import { lowStockServices } from "../services/stock.services";

export const lowStock:RequestHandler = async (req,res)=>{
    const data = await lowStockServices()
    res.status(200).json({error:null,data:data})
}