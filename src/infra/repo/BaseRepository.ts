import { Model, raw } from "objection"
import mainKnexInstance from ".."

export const get = <TModel extends Model, TDomain>(model: any, name: string) =>
    async (id: number): Promise<TDomain> => {
        let entity: any = await model.query(mainKnexInstance).from(name).findById(id)
        if (entity) {
            return entity
        }
        throw new Error('Database Error')
    }

const getAll = <TModel extends Model, TDomain>(model: any, name: string) => async (includes?: any, fields?: string[]): Promise<TDomain[]> => {
    let query = model.query(mainKnexInstance).from(name)
    return await query
}

const createEntity = <TModel extends Model, TDomain>(model: any, name: string) =>
    async (entity: any, fields?: string[]): Promise<TDomain> => {
        var entityDO: any = await model.query(mainKnexInstance).insertAndFetch(entity)
        if (fields && fields.length > 0) {
            return await model.query(mainKnexInstance).findById(entityDO.id).select(fields)
        }
        return entityDO
    }

const updateEntity = <TModel extends Model, TDomain>(model: any, name: string) =>
    async (id: number, attributes: TDomain, fields?: string[]) => {

        var updated: any = await model.query(mainKnexInstance).patchAndFetchById(id, attributes)
        if (updated) {
            return updated
        }
        throw new Error('Database Error')
    }

const deleteEntity = <TModel extends Model, TDomain>(model: any, name: string) => async (id: number): Promise<void> => {
    await model.query(mainKnexInstance).deleteById(id)
}


export const getBaseRepository =
    <TModel extends Model, TDomain>(model: any, name: string) => {
        return {
            get: get<TModel, TDomain>(model, name),
            getAll: getAll<TModel, TDomain>(model, name),
            creatEntity: createEntity<TModel, TDomain>(model, name),
            updateEntity: updateEntity<TModel, TDomain>(model, name),
            deleteEntity: deleteEntity<TModel, TDomain>(model, name)
        }
    }

