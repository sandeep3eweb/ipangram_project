import { IsEmail, IsEnum, IsNotEmpty, IsStrongPassword, MinLength } from "class-validator"
import { UserRole } from "./Enums"

export interface IUser {
    id: number
    firstname: string
    lastname: string
    email: string
    password: string
    hobbies: string
    role: string
    departmentId: number
}

export class User implements IUser {
    id!: number

    @IsNotEmpty()
    firstname: string

    @IsNotEmpty()
    lastname: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsStrongPassword()
    @MinLength(8)
    password: string

    hobbies!: string

    @IsEnum(UserRole)
    role: string

    departmentId: number

    constructor(body: any) {
        this.firstname = body.firstname
        this.lastname = body.lastname
        this.email = body.email
        this.password = body.password
        this.role = body.role
        this.departmentId = body.departmentId
    }
}