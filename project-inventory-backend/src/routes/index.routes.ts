import { Router, type Request, type Response } from "express";
import userRoutes from "../users/routes/user.routes";
import authRoutes from "../auth/routes/auth.routes";
import { authMiddleware } from "../middlewares/auth.middleware";
import categoriesRoutes from "../categories/routes/categories.routes";
import productRoutes from "../products/routes/product.routes";
import movesRoutes from "../moves/routes/moves.routes";
import dashboardRoutes from "../dashboard/routes/route";
import instanceRoutes from "../evolution/instances/routes/instance.route"

const route = Router();

route.get("/ping", (req: Request, res: Response) => {
  res.json({ pong: true });
});

route.use("/auth", authRoutes);
route.use(authMiddleware);
route.use("/users", userRoutes);
route.use("/categories", categoriesRoutes);
route.use("/products", productRoutes);
route.use("/moves", movesRoutes);
route.use("/dashboard", dashboardRoutes);

route.use("/evolution/instance",instanceRoutes)
export default route;
