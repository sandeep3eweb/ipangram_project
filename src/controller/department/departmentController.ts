import { NextFunction, Response, response } from 'express';
import { Request } from "express-jwt";
import { Department } from "../../domain/IDepartment";
import { validateOrReject } from "class-validator";
import { getDepartmentUsecase } from "../../usecases/department/departmentUsecase";
import { getFirstValidationError } from '../../helper/getValidationError';

const usecase = getDepartmentUsecase()

export const createDepartment = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const department = new Department(request.body)
        try {
            await validateOrReject(department)
        } catch (err: any) {
            return next(err)
        }
        const create = await usecase.createDepartment(department)
        return response.json(create)
    } catch (err) {
        next(err)
    }
}

export const updateDepartment = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params['id']
        const department = new Department(request.body)
        try {
            await validateOrReject(department)
        } catch (err: any) {
            return next(getFirstValidationError(err))
        }
        let update = await usecase.updateDepartment(id, department)
        return response.json(update)
    } catch (err) {
        next(err)
    }
}

export const getDepartment = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params['id']
        let department = await usecase.getDepartment(id)
        return response.json(department)
    } catch (err) {
        next(err)
    }
}

export const getDepartments = async (request: Request, response: Response, next: NextFunction) => {
    try {
        let departments = await usecase.getDepartments()
        return response.json(departments)
    } catch (err) {
        next(err)
    }
}