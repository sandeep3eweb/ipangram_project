import mainKnexInstance from ".."
import { UserRole } from "../../domain/Enums"
import { IDepartmentEmployees } from "../../domain/IDepartmentEmployees"
import { IUser } from "../../domain/IUser"
import UserModel from "../Models/UserModel"
import { getBaseRepository } from "./BaseRepository"
import DepartmentModel from '../Models/DepartmentModel';
import { raw } from "objection"
import getPaginatedResult from "../../helper/getPaginatedResult"

const getUserByUsername = () => async (username: string) => {
    return await UserModel.query(mainKnexInstance).findOne('email', username)
}

const getUsersByType = () => async (role: string) => {
    return await UserModel.query(mainKnexInstance).where('role', role)
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

const searchUsers = () => async (department: string, location?: string) => {
    let subQuery = DepartmentModel.query(mainKnexInstance).select('id').where('departmentName', department)
    if (location) {
        subQuery = subQuery.where('location', 'like', `${location}%`)
    }
    let query = UserModel.query(mainKnexInstance).whereIn('departmentId', subQuery)
    let result = await getPaginatedResult(query)
    return result
}

export const getUserRepository = () => {
    const baseRepo = getBaseRepository<UserModel, IUser>(UserModel, 'user')
    return {
        getUsersByType: getUsersByType(),
        createUser: baseRepo.creatEntity,
        getUserByUsername: getUserByUsername(),
        updateUser: baseRepo.updateEntity,
        getUserByIdAndRole: getUserByIdAndRole(),
        updateUsers: updateUsers(),
        searchUsers: searchUsers()
    }
}