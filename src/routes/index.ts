import { Router, type Request, type Response } from "express";
import userRoutes from "../users/user.routes";

const route = Router();

route.get("/ping", (req: Request, res: Response) => {
  res.json({ pong: true });
});

route.use("/users", userRoutes);

export default route;
