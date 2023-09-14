import getPaginationConfig from "./paginationHelper"


const getPaginatedResult = async (query: any) => {
    let pagination: any = getPaginationConfig()
    let sortBy = pagination?.sortBy
    if(sortBy) {
        let sortOrder = pagination?.sortOrder
        query = query.orderBy(sortBy, sortOrder)
    }
    if(pagination) {
        query.page(pagination.offset, pagination.limit)
    }

    return await query
}

export default getPaginatedResult