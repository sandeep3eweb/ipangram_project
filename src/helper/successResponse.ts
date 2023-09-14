
class SuccessResponse {
    private success: true
    private status: 200
    private data: any
    private message: string
    constructor(message: string, data?: any) {
        this.success = true
        this.status = 200
        this.message = message
        this.data = data ? data : null
    }
}

export default SuccessResponse