import express from "express";
const router = express.Router();
import { loginAuth } from "../controllers/userController.js";

router.post("/login", loginAuth);

export default router;