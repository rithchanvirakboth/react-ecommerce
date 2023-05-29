import express from "express";
const router = express.Router();
import { loginAuth, logoutUser, registerUser } from "../controllers/userController.js";

router.post("/login", loginAuth);
router.post("/register", registerUser);
router.post("/logout", logoutUser);

router.get("/user");  

export default router;