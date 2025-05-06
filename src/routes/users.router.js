import { Router } from "express";
import { createUser, getUsers, updatePoints} from "../controllers/users.controller.js";

const router = Router()

router.get("/",getUsers)
router.post("/",createUser)
router.put("/",updatePoints)
export default router