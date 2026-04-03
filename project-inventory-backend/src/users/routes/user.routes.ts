import { Router } from "express";
import { createUser } from "../controllers/user.controller";
import { listUser } from "../controllers/list.controller";
import { getUser } from "../controllers/get.controller";
import { deleteUser } from "../controllers/delete.controller";
import { updateUser } from "../controllers/update.controller";
import { uploadAvatar } from "../../middlewares/upload.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";


const router = Router();
// /api/users/

router.post("/",createUser);
router.get('/',listUser)
router.get('/:id',getUser)
router.delete('/:id',deleteUser)
router.put('/:id',uploadAvatar,updateUser)
export default router;
