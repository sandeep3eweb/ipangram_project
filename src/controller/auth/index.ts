import { Router } from "express";
import { auth } from "./authController";

const authRouter = Router()
authRouter.post('/login', auth)

export default authRouter