import { Router } from "express";
import * as Controller from "../controllers/user.controller";

const router = Router();
// /api/users/

router.post("/", Controller.createUser);

export default router;
