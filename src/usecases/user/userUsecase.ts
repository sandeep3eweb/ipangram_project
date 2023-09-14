import { IDepartmentEmployees } from "../../domain/IDepartmentEmployees"
import { IUser, User } from "../../domain/IUser"
import { getUserRepository } from "../../infra/repo/userRepository"

interface IUserRepository {
    getUserByUsername(username: string): Promise<IUser | undefined>
    createUser(user: IUser): Promise<IUser>
    getUsersByType(type: string): Promise<IUser[]>
    updateUser(id: number, user: IUser): Promise<IUser>
    addDepartmentUsers(empDep: IDepartmentEmployees[]): Promise<any>
    getUserByIdAndRole(id: number, type: string): Promise<IUser>
    updateUsers(userIds: number[], userAttributes: IUser): Promise<any>
}

const repo: IUserRepository = getUserRepository()

const getUserByUsername = () => async (username: string) => {
    return await repo.getUserByUsername(username)
}

const createUser = () => async (user: IUser) => {
    return await repo.createUser(user)
}

const getUsersByType = () => async (type: string) => {
    return await repo.getUsersByType(type)
}

const updateUser = () => async (id: number, user: IUser) => {
    return await repo.updateUser(id, user)
}

const addDepartmentUsers = () => async (departmentId: number, userIds: number[]) => {
    return await repo.updateUsers(userIds, { departmentId: departmentId } as IUser)
}

const getUserByIdAndRole = () => async (id: number, type: string) => {
    return await repo.getUserByIdAndRole(id, type)
}

export const getUserUseCase = () => {
    return {
        createUser: createUser(),
        getUsersByType: getUsersByType(),
        getUserByUsername: getUserByUsername(),
        updateUser: updateUser(),
        addDepartmentUsers: addDepartmentUsers(),
        getUserByIdAndType: getUserByIdAndRole()
    }
}