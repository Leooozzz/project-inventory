import { RequestHandler } from "express";
import { createUserSchema } from "../schemas/user.schema";
import * as userServices from '../services/user.services'
export const createUser: RequestHandler = async (req, res) => {
    try{
        const data = createUserSchema.parse(req.body)

        const user = await userServices.createUser(data)

        res.status(201).json({error:null,data:user})
    }catch (error: any) {
  console.error(error);
  return res.status(400).json({
    message: error.message,
    stack: error.stack
  });
}
};