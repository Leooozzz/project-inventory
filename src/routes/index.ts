import { Router, type Request, type Response } from "express";
import userRoutes from "../users/routes/user.routes";
import authRoutes from "../auth/routes/auth.routes";
import otpRoutes from "../otp/routes/otp.routes";
import { authMiddleware } from "../middlewares/auth.middleware";

const route = Router();

route.get("/ping", (req: Request, res: Response) => {
  res.json({ pong: true });
});

route.use("/auth", authRoutes);
route.use("/auth", otpRoutes);
route.use(authMiddleware)
route.use("/users", userRoutes);

export default route;
