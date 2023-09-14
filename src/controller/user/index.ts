import { Router } from "express";
import { addDepartmentUsers, createUser, getUser, getUsers } from "./userController";

const userRouter = Router()

userRouter.get('/employee', getUsers)
userRouter.get('/:id', getUser)

userRouter.post('/signup', createUser)
userRouter.post('/department/:departmentId', addDepartmentUsers)



export default userRouter