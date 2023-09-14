import mainKnexInstance from ".."
import { UserRole } from "../../domain/Enums"
import { IDepartmentEmployees } from "../../domain/IDepartmentEmployees"
import { IUser } from "../../domain/IUser"
import DepartmentEmployeesModel from "../Models/DepartmentEmployeesModel"
import UserModel from "../Models/UserModel"
import { getBaseRepository } from "./BaseRepository"

const getUserByUsername = () => async (username: string) => {
    return await UserModel.query(mainKnexInstance).findOne('email', username)
}

const getUsersByType = () => async (type: string) => {
    return await UserModel.query(mainKnexInstance).where('role', type)
}

const addDepartmentUsers = () => async (empDe: IDepartmentEmployees[]) => {
    return await DepartmentEmployeesModel.query(mainKnexInstance).insertGraphAndFetch(empDe)
}

const getUserByIdAndRole = () => async (id: number, role: string) => {
    let query = UserModel.query(mainKnexInstance).findOne('id', id).andWhere('role', role)
    if (role === UserRole.EMPLOYEE.valueOf()) {
        query = query.withGraphFetched('department')
    }
    let user = await query
    if (user) {
        return user
    }
    throw new Error('User not found')
}

const updateUsers = () => async (userIds: number[], userAttributes: IUser) => {
    return await UserModel.query(mainKnexInstance).update(userAttributes).whereIn('id', userIds)
}

export const getUserRepository = () => {
    const baseRepo = getBaseRepository<UserModel, IUser>(UserModel, 'user')
    return {
        getUsersByType: getUsersByType(),
        createUser: baseRepo.creatEntity,
        getUserByUsername: getUserByUsername(),
        updateUser: baseRepo.updateEntity,
        addDepartmentUsers: addDepartmentUsers(),
        getUserByIdAndRole: getUserByIdAndRole(),
        updateUsers: updateUsers()
    }
}