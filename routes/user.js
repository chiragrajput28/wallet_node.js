import { Router } from "express";
import authenticateToken from "../controller/session.js";
import { signup, login, verifyOTP } from "../services/user.js";

const userRoutes = Router();

userRoutes.post("/signup", signup);
userRoutes.post("/verifyOTP", verifyOTP);
userRoutes.post("/login", authenticateToken, login);

export default userRoutes;
