import { NextFunction, Response } from "express";
import { Request, UnauthorizedError } from "express-jwt";
import { getUserUseCase } from "../../usecases/user/userUsecase";
import { validatePassword } from "../../helper/validatePassword";
import jwt from 'jsonwebtoken'
import SuccessResponse from "../../helper/successResponse";

const usecase = getUserUseCase()

export const auth = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { username, password } = request.body
        let user = await usecase.getUserByUsername(username)
        if (!user) {
            throw new Error('User not found!')
        }
        if (!validatePassword(password, user.password)) {
            throw new UnauthorizedError('credentials_required', {
                message: 'Username or password incorrect.',
            })
        }
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role,
            }, 'secret')

        return response.json(new SuccessResponse('Logged in successfully.', token))
    } catch (err) {
        next(err)
    }
}