import { Router } from "express";
import { Request,Response } from "express";

const  whatsappRoutes = Router();

whatsappRoutes.get("/ping", (req: Request, res: Response) => {
  res.json({ status: "WhatsApp module working 🚀",});
});
whatsappRoutes.post("/webhook", (req: Request, res: Response) => {
  console.log("📩 Webhook recebido:");
  console.log(JSON.stringify(req.body, null, 2));

  return res.sendStatus(200);
});

export default  whatsappRoutes;
