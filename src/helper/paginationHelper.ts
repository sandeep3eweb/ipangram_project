import { createNamespace, getNamespace } from "continuation-local-storage"

const getPaginationConfig = () => {
    let pagination: any = getNamespace('test')?.get('pagination')
    if (pagination) {
        let pageIndex: any = getNamespace('test')?.get('pageIndex')
        let pageSize: any = getNamespace('test')?.get('pageSize')
        return {
            pagination: pagination,
            pageIndex: pageIndex,
            pageSize: pageSize,
            offset: (pageIndex - 1),
            limit: pageSize,
            sortBy: getNamespace('test')?.get('sortBy'),
            sortOrder: getNamespace('test')?.get('sortOrder'),
            filter: getNamespace('test')?.get('filter')
        }
    }
    return null
}

export default getPaginationConfig