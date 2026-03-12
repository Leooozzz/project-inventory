import { Router } from "express";
import { createCategory } from "../controllers/categories.controller";
import { listCategories } from "../controllers/list.controller";
import { getCategory } from "../controllers/category.controller";
import { updateCategory } from "../controllers/update.controller";
import { deleteCategory } from "../controllers/delete.controller";

const route = Router()

route.post('/',createCategory)
route.get('/',listCategories)
route.get('/:id',getCategory)
route.put('/:id',updateCategory)
route.delete('/:id',deleteCategory)
export default route