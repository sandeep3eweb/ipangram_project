import { NextFunction, Response } from "express"
import { IAuthUser } from "../domain/IAuthUser"
import { Request, UnauthorizedError } from "express-jwt"

export const checkUserRole = (roles: Array<string> | string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authUser: IAuthUser = <IAuthUser>req.auth
      if (typeof roles == 'string') {
        roles = [roles]
      }
      if (roles.includes(authUser.role)) {
        next();
      } else {
        return next(new UnauthorizedError('invalid_token', { message: 'Unauthorized User' }))
      }
    } catch (err) {
      next(err)
    }
  }
}
