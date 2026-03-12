import { Router } from "express";
import { addMove } from "../controller/moves.controller";
import { listMoves } from "../controller/list.controller";

const route = Router()

route.post('/',addMove)
route.get('/',listMoves)
export default route