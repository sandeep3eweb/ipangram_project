import { NextFunction, response } from 'express';
import { Request } from "express-jwt"

export function modifyResponseBody(req: Request, response: any, next: NextFunction) {
    var oldSend = response.send

    response.send = function (data: any) {
        const objData = typeof data === 'string' ? JSON.parse(data) : data
        let fixedResponse: any
        if (objData && objData.message && objData.success) {
            fixedResponse = {
                success: objData.success,
                status: objData.status ?? response.statusCode,
                message: objData.message ?? 'success',
                data: objData.data ?? null,
            }
            arguments[0] = JSON.stringify(fixedResponse)
        } else {
            if (objData) {
                fixedResponse = {
                    success: objData.error ? false : true,
                    status: response.statusCode,
                    message: objData.error ? objData.message : 'success',
                    data: objData.error ? null : objData,
                }
                arguments[0] = JSON.stringify(fixedResponse)
            } else {
                fixedResponse = {
                    success: true,
                    status: response.statusCode,
                    message: 'success',
                    data: null,
                }
                arguments[0] = JSON.stringify(fixedResponse)
            }
        }
        oldSend.apply(response, arguments)
    }
    next()
}