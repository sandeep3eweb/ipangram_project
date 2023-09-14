import bcrypt from 'bcryptjs'

export const validatePassword = (unencryptedPassword: string, password: string) => {
    try {
        let result = bcrypt.compareSync(unencryptedPassword, password);
        return result
    } catch {
        return false
    }
}