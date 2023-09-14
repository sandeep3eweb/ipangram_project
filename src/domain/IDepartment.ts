import { IsNotEmpty } from "class-validator"

export interface IDepartment {
    id: number
    departmentName: string
    categoryName: string
    location: string
    salary: string
    employeeId: number
}

export class Department implements IDepartment {
    id!: number

    @IsNotEmpty()
    departmentName: string

    @IsNotEmpty()
    categoryName: string

    @IsNotEmpty()
    location: string

    @IsNotEmpty()
    salary: string
    employeeId: number

    constructor(body: any) {
        this.departmentName = body.departmentName
        this.categoryName = body.categoryName
        this.location = body.location
        this.salary = body.salary
        this.employeeId = body.employeeId
    }
}