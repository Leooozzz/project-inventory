import { Router } from "express";
import { createProduct } from "../controller/products.controller";
import { listProducts } from "../controller/list.controller";
import { getProduct } from "../controller/product.controller";
import { updateProduct } from "../controller/update.controller";
import { deleteProduct } from "../controller/delete.controller";

const route = Router();

route.post("/", createProduct);
route.get("/", listProducts);
route.get("/:id", getProduct);
route.put("/:id", updateProduct);
route.delete("/:id", deleteProduct);

export default route;
