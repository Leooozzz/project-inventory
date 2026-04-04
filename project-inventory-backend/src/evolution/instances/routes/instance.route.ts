import { Router } from "express";
import { create } from "../controller/create.controller";
import { connect } from "../controller/connect.controller";

const route = Router();

route.post("/create", create);
route.get("/connect", connect);

export default route;
