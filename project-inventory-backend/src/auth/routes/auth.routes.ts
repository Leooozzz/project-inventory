import { Router } from "express";
import { login } from "../controllers/login.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { getMe } from "../controllers/me.controller";
import { register } from "../controllers/register.controller";

const router = Router();

router.post("/register",register)
router.post("/login", login);
router.get("/me", authMiddleware,getMe);

export default router;
