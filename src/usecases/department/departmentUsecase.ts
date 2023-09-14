import { IDepartment } from "../../domain/IDepartment"
import { getDepartmentRepository } from "../../infra/repo/departmentRepository"

interface IDepartmentRepository {
    createDepartment(department: IDepartment): Promise<IDepartment>
    updateDepartment(id: number, department: IDepartment): Promise<IDepartment>
    getDepartment(id: number): Promise<IDepartment>
    getDepartments(): Promise<IDepartment[]>
}

const repo: IDepartmentRepository = getDepartmentRepository()

const createDepartment = () => async (department: IDepartment) => {
    return repo.createDepartment(department)
}

const updateDepartment = () => async (id: number, department: IDepartment) => {
    return await repo.updateDepartment(id, department)
}

const getDepartment = () => async (id: number) => {
    return await repo.getDepartment(id)
}

const getDepartments = () => async () => {
    return await repo.getDepartments()
}



export const getDepartmentUsecase = () => {
    return {
        getDepartment: getDepartment(),
        getDepartments: getDepartments(),
        createDepartment: createDepartment(),
        updateDepartment: updateDepartment()
    }
}