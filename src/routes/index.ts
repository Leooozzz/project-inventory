import { Router, type Request, type Response } from "express";
import userRoutes from "../users/routes/user.routes";
import authRoutes from "../auth/routes/auth.routes";
import otpRoutes from "../otp/routes/otp.routes";
import { authMiddleware } from "../middlewares/auth.middleware";
import categoriesRoutes from "../categories/routes/categories.routes";

const route = Router();

route.get("/ping", (req: Request, res: Response) => {
  res.json({ pong: true });
});

route.use("/auth", authRoutes);
route.use("/auth", otpRoutes);
route.use(authMiddleware)
route.use("/users", userRoutes);
route.use('/categories',categoriesRoutes)
export default route;
