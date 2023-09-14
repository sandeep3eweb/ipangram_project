import { Request } from "express-jwt";
import { NextFunction, Response, response } from 'express';
import { User } from "../../domain/IUser";
import { getUserUseCase } from "../../usecases/user/userUsecase";
import { validateOrReject } from "class-validator";
import { UserRole } from "../../domain/Enums";
import { IAuthUser } from "../../domain/IAuthUser";
import { getFirstValidationError } from "../../helper/getValidationError";

const usecase = getUserUseCase()

export const createUser = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new User(request.body)
        try {
            await validateOrReject(user)
        } catch (err: any) {
            return next(new Error(getFirstValidationError(err)))
        }
        let create = await usecase.createUser(user)
        return response.json(create)
    } catch (err) {
        next(err)
    }
}


export const getUsers = async (request: Request, response: Response, next: NextFunction) => {
    try {
        let users = await usecase.getUsersByType(UserRole.EMPLOYEE.valueOf())
        return response.json(users)
    } catch (err) {
        next(err)
    }
}
export const getUser = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const authUser = <IAuthUser>request.auth
        let userId = +request.params['id']
        if (authUser.role === UserRole.EMPLOYEE.valueOf()) {
            userId = authUser.userId
        }
        let user = await usecase.getUserByIdAndType(userId, UserRole.EMPLOYEE.valueOf())
        return response.json(user)
    } catch (err) {
        next(err)
    }
}

export const updateUser = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const authUser: IAuthUser = <IAuthUser>request.auth
        let id = +request.params.id
        let user: User = new User(request.body)
        try {
            await validateOrReject(user)
        } catch (err: any) {
            return next(new Error(getFirstValidationError(err)))
        }
        let updateUser = await usecase.updateUser(id, user)
        return response.json(updateUser)
    } catch (err) {
        next(err)
    }

}

export const addDepartmentUsers = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const departmentId = +request.params['departmentId']
        let employeesIds = request.body.employees
        let add = await usecase.addDepartmentUsers(departmentId, employeesIds)
        return response.json(add)
    } catch (err) {
        next(err)
    }

}