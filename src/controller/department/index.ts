import { Router } from "express";
import { createDepartment, getDepartment, getDepartments, updateDepartment } from "./departmentController";

const departmentRouter = Router()

departmentRouter.get('/', getDepartments)
departmentRouter.get('/:id', getDepartment)

departmentRouter.post('/', createDepartment)
departmentRouter.put('/:id', updateDepartment)

export default departmentRouter