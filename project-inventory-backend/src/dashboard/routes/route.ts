import { Router } from "express";
import { getInventoryValue } from "../controller/inventory.controller";
import { getMovesSumary } from "../controller/moves.controller";
import { movesGraph } from "../controller/graph.controller";
import { lowStock } from "../controller/stock.controller";
import { stagnantProducts } from "../controller/stagnants.controller";

const route = Router();

route.get("/inventory-value", getInventoryValue);
route.get("/moves-summary", getMovesSumary);
route.get("/moves-graph", movesGraph);
route.get("/low-stock", lowStock);
route.get('/stagnant-products',stagnantProducts)

export default route;
