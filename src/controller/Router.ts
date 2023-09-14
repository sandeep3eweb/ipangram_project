import { Router } from "express";
import authRouter from "./auth";
import userRouter from "./user";
import departmentRouter from "./department";
import { checkUserRole } from "../helper/checkUserRole";
import { UserRole } from "../domain/Enums";

const router = Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/department', checkUserRole(UserRole.MANAGER.valueOf()), departmentRouter)

export default router