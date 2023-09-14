import { NextFunction, Request, Response } from "express";
import { UnauthorizedError, expressjwt } from "express-jwt";

export const jwtMiddleware = (request: Request, response: Response, next: NextFunction) => {
    expressjwt({
        secret: 'secret',
        algorithms: ['HS256']
    })
        .unless({
            path: [
                /^\/api\/auth\/login/,
                /^\/api\/user\/signup/,
                /^\/uploads\/.*/,
                /^\/api\/uploads\/.*/,
            ]
        })(request, response, (err: any) => {
            if (err) {
                return next(err)
            }
            next()
        })
}
