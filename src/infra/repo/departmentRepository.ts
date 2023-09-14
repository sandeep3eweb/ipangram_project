import { IDepartment } from "../../domain/IDepartment"
import DepartmentModel from "../Models/DepartmentModel"
import { getBaseRepository } from "./BaseRepository"

export const getDepartmentRepository = () => {
    const baseRepo = getBaseRepository<DepartmentModel, IDepartment>(DepartmentModel, 'department')
    return {
        getDepartment: baseRepo.get,
        getDepartments: baseRepo.getAll,
        createDepartment: baseRepo.creatEntity,
        updateDepartment: baseRepo.updateEntity
    }
}