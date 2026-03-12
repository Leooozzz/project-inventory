import { Router } from "express";
import { login } from "../controllers/login.controller";
import { logout } from "../controllers/logout.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { getMe } from "../controllers/me.controller";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authMiddleware, getMe);

export default router;
