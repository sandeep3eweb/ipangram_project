import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "express-jwt";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    if (typeof err === 'string') {
        // custom application error
        return res.status(400).json({ error: true, success: false, message: err })
    }
    if (err.name === 'UnauthorizedError' || err instanceof UnauthorizedError) {
        // jwt authentication error
        console.log(req.path)
        console.log(req.url)
        console.log(req.baseUrl)
        return res.status(401).json({ error: true, message: getErrorMessage(err) })
    }
    return res.status(err.statusCode || 500).json({ error: true, message: getErrorMessage(err) })

}


const getErrorMessage = (err: any) => {
    if (err.message.includes('expire')) {
        return 'Session expired. Please login again.'
    }
    if (err instanceof UnauthorizedError) {
        return err.message
    }

    if (err.name == 'UnauthorizedError') {
        return 'Invalid Token'
    }

    // let errorId = err.errorId ? err.errorId : err.metadata.errorId
    return err.message
}
