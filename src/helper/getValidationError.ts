import { ValidationError } from "class-validator";

export const getFirstValidationError = (errors: ValidationError[]) => {
    let error = ''
    if (errors && errors.length > 0 && errors[0].constraints) {
        Object.keys(errors[0].constraints).forEach((v, k) => {
            if (!error && errors[0].constraints && errors[0].constraints[v]) {
                error = errors[0].constraints[v]
            }
        })
    }
    return error
}