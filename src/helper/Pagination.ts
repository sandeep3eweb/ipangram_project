import { createNamespace } from "continuation-local-storage";
import { NextFunction, Request, Response } from "express";
import { IAuthUser } from "../domain/IAuthUser";
import { Request as JWTRequest } from "express-jwt";
let nameSpace = createNamespace('test')

const setPagination = (nameSpace: any, queryParams: any) => {
  let pagination = queryParams.pagination ? Boolean(JSON.parse(queryParams.pagination.toString())) : false
  let pageIndex = 1
  let pageSize = 10
  nameSpace.set('pagination', pagination)
  if (pagination) {
    pageIndex = queryParams.pageIndex ? Number(queryParams.pageIndex) : 1
    pageSize = queryParams.pageSize ? Number(queryParams.pageSize) : 5
    if (pageIndex) {
      nameSpace.set('pageIndex', pageIndex)
    }
    if (pageSize) {
      nameSpace.set('pageSize', pageSize)
    }
  }
  let sortBy = queryParams.sortBy
  if (sortBy) {
    let sortOrder = queryParams.sortOrder
    nameSpace.set('sortBy', sortBy)
    nameSpace.set('sortOrder', sortOrder)
  }
  let filter = queryParams.filter
  if (filter) {
    let filter = {
      filter: true,
      name: queryParams.name,
      email: queryParams.email,
      groupId: queryParams.groupId,
      fullname: queryParams.fullname
    }
    nameSpace.set('filter', filter)
  }
}

export function Pagination(req: JWTRequest, res: Response, next: NextFunction) {
  let queryParams = req.query
  nameSpace.run(async () => {
    setPagination(nameSpace, queryParams)
    next()
  })
}
