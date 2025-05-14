import { Router } from "express";
import {authSGI} from "../controllers/users.controller.js";
import { createPromo, getPromos } from "../controllers/promos.controller.js";
import upload from "../config/multer.config.js";

const router = Router()



//Login
router.get("/",getPromos)
router.post("/uploads",authSGI,upload.single("image"),createPromo)

export default router