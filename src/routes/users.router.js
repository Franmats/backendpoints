import { Router } from "express";
import { accessProfile, createUser, getUsers, loginJWT, auth,updatePoints,getPointsForUser, authenticate, LogOut, authSGI} from "../controllers/users.controller.js";
import { authToken } from "../utils.js";

const router = Router()

router.get("/",authSGI,getUsers)
router.post("/",authSGI,createUser)
router.put("/sgi",authSGI,updatePoints)

//Login
router.post("/register",createUser)
router.get("/auth",auth)
router.post("/login" ,loginJWT)
router.get("/profile",authenticate,accessProfile)
router.get("/profile/points",authenticate,getPointsForUser)
router.post("/logout",LogOut)


export default router