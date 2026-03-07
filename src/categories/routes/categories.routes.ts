import { Router } from "express";
import { createCategory } from "../controllers/category.controller";
import { listCategories } from "../controllers/list.controller";


const route = Router()

route.post('/',createCategory)
route.get('/',listCategories)

export default route