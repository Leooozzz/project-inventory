import { Router } from "express";
import { verifyOtp } from "../controllers/verifyOtp.controller";

const route = Router();

route.post("/useotp", verifyOtp);

export default route;
