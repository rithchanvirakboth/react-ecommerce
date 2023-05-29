import express from "express";
const router = express.Router();
import { loginAuth, registerUser } from "../controllers/userController.js";

router.post("/login", loginAuth);
router.post("/register", registerUser);
router.post("/logout", logoutUser);

export default router;